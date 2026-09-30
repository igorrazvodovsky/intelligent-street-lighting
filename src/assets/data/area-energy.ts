import { NightSun } from '~local/management/profiles/profile-detail/sun-times';

export interface EnergyReading {
  value: number
  date: Date
}

// Seeded, so an area's curve stays the same across reloads
function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hoursOf = (date: Date) => date.getHours() + date.getMinutes() / 60;

// Hourly energy use of one area over a day, in kWh. Lamps burn from sunset to
// sunrise at full level, dimmed between 01:00 and 05:00, and the hours the sun
// sets and rises in use energy for the part of the hour that's dark. So the
// curve follows the city's latitude and the season.
export function areaEnergy(night: NightSun, seed: number): EnergyReading[] {
  const next = random(seed);
  const sunrise = hoursOf(night.sunrise);
  const sunset = hoursOf(night.sunset);
  return Array.from({ length: 24 }, (_, hour) => {
    const dark = Math.max(0, Math.min(hour + 1, sunrise) - hour) + Math.max(0, hour + 1 - Math.max(hour, sunset));
    const level = hour >= 1 && hour < 5 ? 3 + next() * 2 : 7 + next() * 3;
    return {
      value: Math.round(Math.min(1, dark) * level * 10) / 10,
      date: new Date(null as any, null as any, 1, hour),
    };
  });
}
