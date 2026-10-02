import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { groupChain } from '~local/services/device-tree'
import { Observable, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Device, DeviceGroup, Category, City, DEVICE_TYPE_LABELS } from '~local/types'
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

interface Crumb { name: string, id: number, type?: string };

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {
  groupId$ = new BehaviorSubject(null)
  deviceId$ = new BehaviorSubject(null)
  groupId: number
  deviceId: number
  private destroy$ = new Subject<void>();

  currentGroup: Crumb[] = []
  groupSiblings: Crumb[][] = []
  deviceSiblings$: Observable<Device[]>
  devices: Crumb[] = []
  currentDevice: Crumb
  city: string
  cities: City[]
  activeCityId: string
  category: Category = "Area"
  isDevicesRoute: boolean

  deviceTypeMap = DEVICE_TYPE_LABELS

  constructor(
    private service: DeviceService,
    private cityService: CityService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  // Prefills the rename field with whatever the last crumb names
  get currentName(): string {
    return this.currentDevice?.name ?? this.currentGroup[this.currentGroup.length - 1]?.name ?? ''
  }

  getRouteInfo() {
    const url = this.router.routerState.snapshot.url
    this.isDevicesRoute = url.startsWith('/management/devices')
    const objectType = url.substring(20).split('/')[0]
    const objectId = url.substring(20).split('/')[1]
    switch (objectType) {
      case 'device':
        this.deviceId$.next(+objectId)
        break;
      case 'group':
        this.deviceId$.next(null)
        this.groupId$.next(+objectId)
        break;
      default:
        this.groupId$.next(null)
        this.deviceId$.next(null)
    }
  }

  ngOnInit(): void {
    this.cities = this.cityService.cities
    this.activeCityId = this.cityService.city.id
    this.cityService.activeCity$.pipe(takeUntil(this.destroy$)).subscribe(city => {
      this.city = city.name
      this.activeCityId = city.id
    })
    this.getRouteInfo()

    // Rebuilt from the whole group list on every change, so a city switch
    // replaces the crumbs rather than adding to them
    combineLatest([this.groupId$.pipe(distinctUntilChanged()), this.service.Groups])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([id, groups]: [number, DeviceGroup[]]) => {
        this.groupId = id
        const chain = id ? groupChain(groups, id) : []
        this.currentGroup = chain.map(g => ({ id: g.id, name: g.name }))
        this.groupSiblings = chain.map(g => groups
          .filter(sibling => sibling.parentId == g.parentId)
          .map(sibling => ({ id: sibling.id, name: sibling.name })))
      });

    combineLatest([this.deviceId$.pipe(distinctUntilChanged()), this.service.Devices])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([id, devices]: [number, Device[]]) => {
        this.deviceId = id
        const device = id ? devices.find(d => d.id == id) : undefined
        this.currentDevice = device ?? null
        this.devices = device
          ? devices.filter(d => d.groupId == device.groupId).map(d => ({ name: d.name, id: d.id, type: d.type }))
          : []
        if (device && this.groupId !== device.groupId) this.groupId$.next(device.groupId)
      });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getRouteInfo()
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGroupChange(value) {
    let id = this.groupSiblings.flat().find(group => group.name == value).id
    this.router.navigate(['/management/devices/group/' + id]);
  }

  onDeviceChange(value) {
    let id = this.devices.find(device => device.name == value).id
    this.router.navigate(['device/' + id], { relativeTo: this.activatedRoute });
  }

  // Device and group ids belong to one city, so leave a device or group page
  // before switching; its id would match nothing in the other city
  onCityChange(cityId: string) {
    if (/^\/management\/devices\/(device|group)\//.test(this.router.url)) {
      this.router.navigate(['/management/devices']).then(() => this.cityService.setCity(cityId))
    }
    else this.cityService.setCity(cityId)
  }
}
