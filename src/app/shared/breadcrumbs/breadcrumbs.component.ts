import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '~local/services/device.service'
import { Observable } from 'rxjs';
import { Device } from '~local/types'
import { Router, ActivatedRoute } from '@angular/router';

interface Crumb { name: string, id: number };

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
  @Input() groupId: number;
  @Input() deviceId: number;

  currentGroup: any[] = [];
  groupSiblings: Crumb[][] = []
  deviceSiblings$: Observable<Device[]>;
  devices: Crumb[];
  currentDevice: Crumb;

  constructor(
    private service: DeviceService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.deviceSiblings$ = this.service.getDevicesByGroup(this.groupId);

    this.getSelectedGroup(this.groupId);

    this.deviceSiblings$.subscribe(devices => {
      this.devices = devices.map(device => ({ name: device.name, id: device.id }));
      this.currentDevice = this.devices.find(device => device.id == this.deviceId)
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
    this.router.navigate(['/management/devices/' + id]);
  }

  onDeviceChange(value) {
    let id = this.devices.find(device => device.name == value).id
    this.router.navigate([this.groupId + '/' + id], { relativeTo: this.activatedRoute });
  }
}
