import { City } from '~local/types';

// Sunrise, sunset and civil twilight from the sunrise equation, accurate to a
// minute or two, which is enough for a preview. Real controllers switch on a
// light sensor.
// https://en.wikipedia.org/wiki/Sunrise_equation

const rad = Math.PI / 180;
const DAY = 86400000;
const J1970 = 2440587.5;
const J2000 = 2451545;

const toJulian = (date: Date) => date.getTime() / DAY + J1970;
const fromJulian = (j: number) => new Date(Math.round((j - J1970) * DAY / 60000) * 60000);

// Sunrise and sunset: -0.833° allows for refraction and the size of the sun's disc
const HORIZON = -0.833;
// Civil twilight ends in the evening and starts in the morning with the sun 6°
// below the horizon. From then on it's dark enough to need full street lighting.
const CIVIL = -6;

// Instants the sun rises past and sets below an altitude on a calendar day, or
// null if it stays above or below it all day. `year`, `month` and `day` name
// the day at the given place.
function sunOn(year: number, month: number, day: number, lat: number, lng: number, altitude: number) {
  const n = Math.round(toJulian(new Date(Date.UTC(year, month, day, 12))) - J2000 + 0.0008);
  const meanSolarNoon = n - lng / 360;
  const anomaly = (357.5291 + 0.98560028 * meanSolarNoon) % 360;
  const centre = 1.9148 * Math.sin(anomaly * rad) + 0.02 * Math.sin(2 * anomaly * rad) + 0.0003 * Math.sin(3 * anomaly * rad);
  const longitude = (anomaly + centre + 180 + 102.9372) % 360;
  const transit = J2000 + meanSolarNoon + 0.0053 * Math.sin(anomaly * rad) - 0.0069 * Math.sin(2 * longitude * rad);
  const sinDeclination = Math.sin(longitude * rad) * Math.sin(23.4397 * rad);
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const cosHourAngle = (Math.sin(altitude * rad) - Math.sin(lat * rad) * sinDeclination) / (Math.cos(lat * rad) * cosDeclination);
  if (Math.abs(cosHourAngle) > 1) return null;
  const hourAngle = Math.acos(cosHourAngle) / rad;
  return { rise: fromJulian(transit - hourAngle / 360), set: fromJulian(transit + hourAngle / 360) };
}

// Wall-clock hours and minutes of an instant in a time zone
function clockIn(instant: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false })
    .formatToParts(instant);
  const part = (type: string) => +parts.find(p => p.type === type)!.value;
  // Some engines write midnight as 24
  return { hours: part('hour') % 24, minutes: part('minute') };
}

export interface NightSun {
  // The evening the night starts on
  date: Date
  // Placed on the preview's noon-to-noon axis, see profile-series.ts. In the
  // evening sunset comes before dusk, in the morning dawn before sunrise.
  sunset: Date
  dusk: Date
  dawn: Date
  sunrise: Date
}

// Placeholders for places where the sun doesn't set or rise
const FALLBACK = {
  sunset: new Date(null, null, 1, 20, 30),
  dusk: new Date(null, null, 1, 21, 10),
  dawn: new Date(null, null, 2, 5, 30),
  sunrise: new Date(null, null, 2, 6, 10),
};

// A clock time in the city, on the preview's axis. Times before noon fall on
// the next morning.
function onAxis(instant: Date, city: City) {
  const { hours, minutes } = clockIn(instant, city.timeZone);
  return new Date(null, null, hours < 12 ? 2 : 1, hours, minutes);
}

// Sunset and dusk on `date` and dawn and sunrise the next morning in the city
export function nightSun(city: City, date: Date): NightSun {
  const [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate()];
  const at = (day: number, altitude: number) => sunOn(y, m, day, city.centerLat, city.centerLng, altitude);
  const evening = at(d, HORIZON);
  const morning = at(d + 1, HORIZON);
  if (!evening || !morning) return { date, ...FALLBACK };
  const sunset = onAxis(evening.set, city);
  const sunrise = onAxis(morning.rise, city);
  // Around midsummer far enough north, twilight lasts all night. It's darkest
  // halfway between sunset and sunrise.
  const eveningCivil = at(d, CIVIL);
  const morningCivil = at(d + 1, CIVIL);
  const darkest = new Date(Math.round((sunset.getTime() + sunrise.getTime()) / 2 / 60000) * 60000);
  return {
    date,
    sunset,
    dusk: eveningCivil ? onAxis(eveningCivil.set, city) : darkest,
    dawn: morningCivil ? onAxis(morningCivil.rise, city) : darkest,
    sunrise,
  };
}

// The next date, from today, that falls on a weekday. Monday is 0.
export function nextWeekday(weekday: number, from = new Date()) {
  const today = (from.getDay() + 6) % 7;
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() + (weekday - today + 7) % 7);
}
