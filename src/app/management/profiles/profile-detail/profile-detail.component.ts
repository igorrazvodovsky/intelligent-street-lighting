import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile, DeviceGroup, City, Schedule, ScheduleDynamic, ScheduleTime } from '~local/types'
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '~local/services/profile.service'
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { profileToSeries, SeriesPoint } from './profile-series'
import { nextWeekday, nightSun, NightSun } from './sun-times'
import { clockTime, sameTime, timeToOption } from './schedule-time'
import { BOOSTS } from './profile-schedule-dynamic/profile-schedule-dynamic.component'

@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  profile$!: Observable<Profile>;
  profile: Profile;
  groups$!: Observable<DeviceGroup[]>;
  active: 'always' | 'date' | 'range' = 'always';
  previewMidnight: boolean = true
  private destroy$ = new Subject<void>();

  // Monday is 0, to match the week arrays in schedules
  weekday = (new Date().getDay() + 6) % 7;
  series: SeriesPoint[];
  // Sun times for the coming night on the selected weekday in the active city
  sun: NightSun;
  city: City;
  // The schedule or boost added last, shown expanded
  added: Schedule | ScheduleDynamic;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private deviceService: DeviceService,
    private cityService: CityService,
  ) { }

  ngOnInit() {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.profileService.getProfile(params.get('id')!))
    );
    this.groups$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.deviceService.getGroupsByProfile(params.get('id')!);
      })
    );
    combineLatest([this.profile$, this.cityService.activeCity$]).pipe(takeUntil(this.destroy$)).subscribe(([profile, city]) => {
      this.profile = profile;
      this.city = city;
      this.updateSeries();
    })
  }

  // Call whenever the day or a setting the series depends on changes
  updateSeries() {
    this.sun = nightSun(this.city, nextWeekday(this.weekday));
    this.series = profileToSeries(this.profile, this.weekday, this.profile.isInterpolated, this.sun);
  }

  // Edits change the in-memory profile, so they last until the page reloads

  // A new schedule dims one step further inside the one before it, the way
  // operators cut in stages: 100% at dusk, 75% from 22:00 to 06:00, 50% from
  // 00:00 to 05:00. Each step takes 25 points off, down to 20%.
  addSchedule() {
    const last = this.profile.schedules[this.profile.schedules.length - 1];
    const brightness = Math.max(Math.min(last.brightness, 0.2), Math.round((last.brightness - 0.25) * 20) / 20);
    const { start, end } = narrower(last.time.start, last.time.end);
    this.added = {
      name: 'New schedule',
      brightness,
      time: { start, end, week: Array.from({ length: 7 }, () => ({ enabled: true })) },
    };
    this.profile.schedules.push(this.added);
    this.updateSeries();
  }

  addBoost() {
    const boosts = this.profile.schedulesDynamic || [];
    const suggested = this.suggestBoosts(boosts)[0];
    this.added = suggested?.boost || { brightness: 0.2, time: { start: clockTime(0), end: clockTime(24) } };
    // Later boosts override earlier ones, so a boost for an earlier schedule
    // goes before the boosts for later ones
    const at = suggested ? boosts.findIndex(b => this.scheduleIndex(b) > suggested.index) : -1;
    this.profile.schedulesDynamic = at < 0 ? [...boosts, this.added] : [...boosts.slice(0, at), this.added, ...boosts.slice(at)];
    this.updateSeries();
  }

  // Turning traffic on starts with boosts wherever the profile dims
  toggleDynamic() {
    if (this.profile.dynamic && !this.profile.schedulesDynamic?.length) {
      this.profile.schedulesDynamic = this.suggestBoosts([]).map(s => s.boost).reverse();
    }
    this.updateSeries();
  }

  // Boosts that bring dimmed schedules back to the profile's brightest level,
  // latest schedule first, skipping schedules that already have one
  private suggestBoosts(boosts: ScheduleDynamic[]): { boost: ScheduleDynamic, index: number }[] {
    const { schedules } = this.profile;
    const top = Math.max(...schedules.map(s => s.brightness));
    return schedules
      .map((schedule, index) => ({ schedule, index }))
      .filter(({ schedule, index }) => schedule.brightness < top && !boosts.some(b => this.scheduleIndex(b) === index))
      .reverse()
      .map(({ schedule, index }) => {
        const gap = top - schedule.brightness;
        const brightness = BOOSTS.reduce((a, b) => Math.abs(b - gap) < Math.abs(a - gap) ? b : a);
        return { boost: { brightness, time: { start: schedule.time.start, end: schedule.time.end } }, index };
      });
  }

  // The last schedule with the same times as the boost, or -1
  private scheduleIndex(boost: ScheduleDynamic): number {
    const { schedules } = this.profile;
    for (let i = schedules.length - 1; i >= 0; i--) {
      if (sameTime(schedules[i].time.start, boost.time.start) && sameTime(schedules[i].time.end, boost.time.end)) return i;
    }
    return -1;
  }

  // Later items override earlier ones, so order is priority
  move<T>(list: T[], item: T, by: -1 | 1) {
    const i = list.indexOf(item);
    list.splice(i, 1);
    list.splice(i + by, 0, item);
    this.updateSeries();
  }

  remove<T>(list: T[], item: T) {
    list.splice(list.indexOf(item), 1);
    this.updateSeries();
  }

  selectWeekday(weekday: number) {
    this.weekday = weekday;
    this.updateSeries();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}





// Two hours later and an hour earlier than the given times, or 22:00 to 06:00
// inside a dusk-to-dawn schedule. Keeps the times when that leaves under two
// hours or they follow the sun.
function narrower(start: ScheduleTime, end: ScheduleTime): { start: ScheduleTime, end: ScheduleTime } {
  const whole = sameTime(start, end) || ['00:00', '24:00'].includes(timeToOption(start)) && ['00:00', '24:00'].includes(timeToOption(end));
  if (whole) return { start: clockTime(22), end: clockTime(6) };
  if (!(start instanceof Date) || !(end instanceof Date)) return { start, end };
  // Hours after noon, so a night reads as one increasing range
  const fromNoon = (d: Date) => ((d.getHours() + d.getMinutes() / 60) + 12) % 24;
  const from = fromNoon(start) + 2;
  const to = fromNoon(end) - 1;
  if (to - from < 2) return { start, end };
  const toClock = (h: number) => clockTime(Math.floor((h + 12) % 24), Math.round((h % 1) * 60));
  return { start: toClock(from), end: toClock(to) };
}
