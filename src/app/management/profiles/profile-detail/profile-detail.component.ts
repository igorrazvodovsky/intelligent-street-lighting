import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profile, DeviceGroup, City, Schedule, ScheduleDynamic } from '~local/types'
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '~local/services/profile.service'
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { profileToSeries, SeriesPoint } from './profile-series'
import { nextWeekday, nightSun, NightSun } from './sun-times'
import { clockTime } from './schedule-time'

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

  addSchedule() {
    this.added = {
      name: 'New schedule',
      brightness: 0.5,
      time: { start: clockTime(22), end: clockTime(6), week: Array.from({ length: 7 }, () => ({ enabled: true })) },
    };
    this.profile.schedules.push(this.added);
    this.updateSeries();
  }

  addBoost() {
    this.added = { brightness: 0.3, time: { start: clockTime(22), end: clockTime(6) } };
    this.profile.schedulesDynamic = [...(this.profile.schedulesDynamic || []), this.added];
    this.updateSeries();
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




