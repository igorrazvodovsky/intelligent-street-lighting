import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Device } from '~local/types'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';

interface Crumb { name: string, id: number };

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
  devices: Crumb[]
  currentDevice: Crumb
  city: string

  constructor(
    private service: DeviceService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  getInfo() {
    const objectType = this.router.routerState.snapshot.url.substring(20).split('/')[0]
    const objectId = this.router.routerState.snapshot.url.substring(20).split('/')[1]
    switch (objectType) {
      case 'device':
        this.deviceId$.next(+objectId)
        break;
      case 'group':
        this.groupId$.next(+objectId)
        break;
      default:
      // ???
    }
  }

  ngOnInit(): void {

    this.getInfo()

    this.groupId$.pipe(distinctUntilChanged()).subscribe((id: number) => {
      this.groupId = id
      if (id) this.getSelectedGroup(id)
    });

    this.deviceId$.pipe(distinctUntilChanged()).subscribe((id: number) => {
      this.deviceId = id
      if (id) {
        this.service.getDevice(id).subscribe(device => {
          this.currentDevice = device
          this.deviceSiblings$ = this.service.getDevicesByGroup(device.groupId)
          if (this.groupId !== device.groupId) this.getSelectedGroup(id)
        })
      }
    });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.getInfo()
      }
    });

    this.city = this.service.city.name

    // if (this.groupId) this.getSelectedGroup(this.groupId)

    this.deviceSiblings$.subscribe(devices => {
      this.devices = devices.map(device => ({ name: device.name, id: device.id }))
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
    let id = this.groupSiblings.flat().find(group => group.name == value).id
    this.router.navigate(['/management/devices/group/' + id]);
  }

  onDeviceChange(value) {
    let id = this.devices.find(device => device.name == value).id
    this.router.navigate(['device/' + id], { relativeTo: this.activatedRoute });
  }
}
