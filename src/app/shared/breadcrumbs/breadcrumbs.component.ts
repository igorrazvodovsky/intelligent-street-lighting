import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { CityService } from '~local/services/city.service'
import { groupChain } from '~local/services/device-tree'
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, startWith, takeUntil } from 'rxjs/operators';
import { Device, DeviceGroup, Category, City, DEVICE_TYPE_LABELS } from '~local/types'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

interface Crumb { name: string, id: number, type?: string };

// /management/devices, optionally followed by a device or group id. Anchored on
// the path alone, so a query such as ?show=map doesn't end up in the id.
const DEVICES_ROUTE = /^\/management\/devices(?:\/(device|group)\/(\d+))?(?=[/?#]|$)/

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit, OnDestroy {
  groupId$ = new BehaviorSubject<number | null>(null)
  deviceId$ = new BehaviorSubject<number | null>(null)
  groupId: number
  deviceId: number
  private destroy$ = new Subject<void>();

  currentGroup: Crumb[] = []
  groupSiblings: Crumb[][] = []
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

  // A device page leaves groupId$ alone: the device's own group fills it in
  private getRouteInfo() {
    const match = this.router.url.match(DEVICES_ROUTE)
    this.isDevicesRoute = !!match
    const [, type, id] = match ?? []
    if (type === 'device') {
      this.deviceId$.next(+id)
    } else if (type === 'group') {
      this.deviceId$.next(null)
      this.groupId$.next(+id)
    } else {
      this.groupId$.next(null)
      this.deviceId$.next(null)
    }
  }

  ngOnInit(): void {
    this.cities = this.cityService.cities
    this.cityService.activeCity$.pipe(takeUntil(this.destroy$)).subscribe(city => {
      this.city = city.name
      this.activeCityId = city.id
    })
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

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null),
      takeUntil(this.destroy$)
    ).subscribe(() => this.getRouteInfo());

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
    if (this.router.url.match(DEVICES_ROUTE)?.[1]) {
      this.router.navigate(['/management/devices']).then(() => this.cityService.setCity(cityId))
    }
    else this.cityService.setCity(cityId)
  }
}
