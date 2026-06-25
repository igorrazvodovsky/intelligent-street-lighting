// TODO: Empty current group on change

import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Device, Category, City } from '~local/types'
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

interface Crumb { name: string, id: number, type?: string };

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
  groupId$ = new BehaviorSubject(null)
  deviceId$ = new BehaviorSubject(null)
  groupId: number
  deviceId: number

  currentGroup: any[] = []
  groupSiblings: Crumb[][] = []
  deviceSiblings$: Observable<Device[]>
  devices: Crumb[] = []
  currentDevice: Crumb
  city: string
  cities: City[]
  activeCityId: string
  category: Category = "Area"
  isDevicesRoute: boolean

  deviceTypeMap: any = {
    'lamp': 'Lamp',
    'sc': 'Segment controller',
    'sensor': '',
  }

  constructor(
    private service: DeviceService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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
    this.cities = this.service.cities
    this.activeCityId = this.service.city.id
    this.service.activeCity$.subscribe(city => {
      this.city = city.name
      this.activeCityId = city.id
    })
    this.getRouteInfo()

    this.groupId$.pipe(distinctUntilChanged()).subscribe((id: number) => {
      this.groupId = id
      if (id) {
        this.getSelectedGroup(id)
      }
      else this.currentGroup = []
    });

    this.deviceId$.pipe(distinctUntilChanged()).subscribe((id: number) => {
      this.deviceId = id
      if (id) {
        // Get device...
        this.service.getDevice(id).subscribe(device => {
          this.currentDevice = device
          // ...siblings
          this.service.getDevicesByGroup(device.groupId).subscribe(devices => {
            this.devices = devices.map(device => ({ name: device.name, id: device.id, type: device.type }))
          });
          // group
          if (this.groupId !== device.groupId) {
            this.groupId$.next(device.groupId)
          }
        })
      }
      else this.currentDevice = null
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getRouteInfo()
      }
    });

  }

  getSelectedGroup(id) {
    this.service.getGroup(id).subscribe(group => {
      this.currentGroup.unshift({ id: group.id, name: group.name })
      this.service.getGroupsByParent(group.parentId).subscribe(groups => this.groupSiblings.unshift(groups))
      if (group.parentId) this.getSelectedGroup(group.parentId);
    })
  }

  onGroupChange(value) {
    this.currentGroup = []
    let id = this.groupSiblings.flat().find(group => group.name == value).id
    this.router.navigate(['/management/devices/group/' + id]);
  }

  onDeviceChange(value) {
    let id = this.devices.find(device => device.name == value).id
    this.router.navigate(['device/' + id], { relativeTo: this.activatedRoute });
  }

  onCityChange(cityId: string) {
    this.service.setCity(cityId)
  }
}
