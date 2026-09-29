import { Profile, ScheduleTime } from '~local/types';

// The preview shows one night, from noon on the selected weekday to noon the
// next day. Times are minutes into that window: 0 is noon, 720 is midnight.
// A schedule enabled on a weekday belongs to that weekday's night, so its
// times before noon fall on the next morning. For example, 00:00–07:00 on
// Friday dims the lights from midnight between Friday and Saturday.

export interface SeriesPoint {
  static: number
  dynamic: number
  date: Date
}

const WINDOW = 24 * 60;

// Minutes between points where the level curves, such as across twilight
const SAMPLE = 3;

// Smoothstep: 0 to 1 with a gentle start and finish
const ease = (x: number) => x * x * (3 - 2 * x);

// Minutes from `from` up to, not including, `to`
const every = (from: number, to: number, step = SAMPLE) =>
  Array.from({ length: Math.max(0, Math.ceil((to - from) / step)) }, (e, i) => from + i * step);
const NOON = 12 * 60;

// How long a smooth change between two brightness levels takes
const RAMP = 30;

// Minutes since midnight. `t(24)` rolls over to the next day, so it reads as
// 1440 rather than 0.
const clockMinutes = (d: Date) =>
  d.getHours() * 60 + d.getMinutes() + (d.getDate() !== new Date(0, 0, 0).getDate() ? WINDOW : 0);
const toWindow = (clock: number) => ((clock - NOON) % WINDOW + WINDOW) % WINDOW;
const windowToDate = (m: number) => new Date(null, null, 1, 12, m);
const dateToWindow = (d: Date) => (d.getTime() - windowToDate(0).getTime()) / 60000;

interface Span { start: number, end: number, value: number }

const covers = ({ start, end }: Span, m: number) =>
  start === end || (start < end ? m >= start && m < end : m >= start || m < end);

// Later spans override earlier ones
const valueAt = (spans: Span[], m: number) =>
  spans.reduce((value, span) => covers(span, m) ? span.value : value, 0);

// Sun times on the window's axis, see sun-times.ts
export interface SeriesSun {
  sunset: Date
  dusk: Date
  dawn: Date
  sunrise: Date
}

interface Level { static: number, dynamic: number }

// Lights are off between sunrise and sunset. With `profile.naturalLight` they
// follow the fading daylight: they come on at sunset and reach the scheduled
// level by dusk, then fade out between dawn and sunrise. Without it they switch
// straight to the scheduled level at sunset and off at sunrise.
export function profileToSeries(profile: Profile, weekday: number, smooth: boolean, sun: SeriesSun): SeriesPoint[] {
  const sunset = dateToWindow(sun.sunset);
  const sunrise = dateToWindow(sun.sunrise);
  const dusk = dateToWindow(sun.dusk);
  const dawn = dateToWindow(sun.dawn);

  const toMinute = (time: ScheduleTime) =>
    time === 'sunset' ? sunset : time === 'sunrise' ? sunrise : toWindow(clockMinutes(time));
  // Equal start and end mean the whole day, which covers `t(0)`–`t(24)`
  const toSpan = (start: ScheduleTime, end: ScheduleTime, value: number): Span =>
    ({ start: toMinute(start), end: toMinute(end), value });

  const staticSpans = profile.schedules
    .filter(s => s.time.week[weekday]?.enabled !== false)
    .map(s => {
      const day = s.time.week[weekday] || {};
      return toSpan(day.start || s.time.start, day.end || s.time.end, s.brightness);
    });
  const dynamicSpans = !profile.dynamic ? [] : (profile.schedulesDynamic || [])
    .map(s => toSpan(s.time.start, s.time.end, s.brightness));

  // Share of the scheduled level that's needed at minute m, from 0 in daylight
  // to 1 in the dark, easing in and out across twilight. Without natural light
  // it jumps at sunset and sunrise, so it differs just before and just after.
  const darkness = (m: number, side: 'before' | 'after' = 'after') => {
    if (!profile.naturalLight) {
      return (side === 'after' ? m >= sunset && m < sunrise : m > sunset && m <= sunrise) ? 1 : 0;
    }
    if (m <= sunset || m >= sunrise) return 0;
    if (m < dusk) return ease((m - sunset) / (dusk - sunset));
    if (m > dawn) return ease((sunrise - m) / (sunrise - dawn));
    return 1;
  };

  // Scheduled level in percent from minute m until the next breakpoint
  const scheduledAt = (m: number): Level => {
    const base = valueAt(staticSpans, m) * 100;
    const boost = valueAt(dynamicSpans, m) * 100;
    return { static: base, dynamic: Math.min(boost, 100 - base) };
  };

  // Not rounded: rounding every sample would make eased curves ripple
  const scale = (level: Level, share: number): Level =>
    ({ static: level.static * share, dynamic: level.dynamic * share });
  const point = (m: number, level: Level) => ({ ...level, date: windowToDate(m) });
  const same = (a: Level, b: Level) => a.static === b.static && a.dynamic === b.dynamic;

  const edges = [...staticSpans, ...dynamicSpans].flatMap(s => [s.start, s.end]);

  if (!smooth) {
    // Between two breakpoints the scheduled level is constant, so straight
    // lines join the points. Twilight is sampled, since darkness eases there.
    const breakpoints = Array.from(new Set([
      0, WINDOW, sunset, sunrise,
      ...(profile.naturalLight ? [dusk, dawn, ...every(sunset, dusk), ...every(dawn, sunrise)] : []),
      ...edges,
    ])).sort((a, b) => a - b);

    const series = [point(0, scale(scheduledAt(0), darkness(0)))];
    breakpoints.slice(1).forEach((m, i) => {
      const before = scale(scheduledAt(breakpoints[i]), darkness(m, 'before'));
      if (m === WINDOW) return series.push(point(m, before));
      const after = scale(scheduledAt(m), darkness(m));
      // A step draws the change as a vertical edge
      series.push(...same(before, after) ? [point(m, after)] : [point(m, before), point(m, after)]);
    });
    return series;
  }

  // A smooth change between scheduled levels takes RAMP minutes, cut short only
  // by the next change. Daylight scales the result, so a change close to dusk
  // or dawn blends into the twilight fade rather than being squeezed before it.
  const changeTimes = Array.from(new Set(edges)).filter(m => m > 0 && m < WINDOW).sort((a, b) => a - b);
  const changes = changeTimes
    .map((at, i) => ({ at, from: scheduledAt(i ? changeTimes[i - 1] : 0), to: scheduledAt(at) }))
    .filter(c => c.from.static !== c.to.static || c.from.dynamic !== c.to.dynamic)
    .map((c, i, all) => ({ ...c, ramp: Math.min(RAMP, (all[i + 1]?.at ?? WINDOW) - c.at) }));

  const lerp = (a: number, b: number, share: number) => a + (b - a) * share;
  const smoothAt = (m: number): Level => {
    const change = changes.find(c => m >= c.at && m < c.at + c.ramp);
    if (!change) return scheduledAt(m);
    const share = ease((m - change.at) / change.ramp);
    return {
      static: lerp(change.from.static, change.to.static, share),
      dynamic: lerp(change.from.dynamic, change.to.dynamic, share),
    };
  };

  // Sample wherever the level curves: ramps and twilight. Without natural
  // light, lights switch on and off within a minute.
  const minutes = Array.from(new Set([
    0, WINDOW, sunset, sunrise,
    ...changes.flatMap(c => [...every(c.at, c.at + c.ramp), c.at + c.ramp]),
    ...(profile.naturalLight
      ? [dusk, dawn, ...every(sunset, dusk), ...every(dawn, sunrise)]
      : [sunset + 1, sunrise + 1]),
  ])).filter(m => m >= 0 && m <= WINDOW).sort((a, b) => a - b);

  // With natural light, the lamp fades towards the level scheduled at dusk and
  // away from the one at dawn, so changes inside twilight don't show. A change
  // still under way at dawn is skipped, since daylight takes over before it
  // would finish; otherwise it would show as a brief spike.
  const cutShort = changes.find(c => c.at < dawn && c.at + c.ramp > dawn);
  const freeze = cutShort ? cutShort.at : dawn;
  const levelAt = (m: number) =>
    !profile.naturalLight ? smoothAt(m) : smoothAt(m < dusk ? dusk : Math.min(m, freeze));

  return minutes.map(m => point(m, scale(levelAt(m), darkness(m, 'before'))));
}
