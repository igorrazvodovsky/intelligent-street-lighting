import { Observable } from 'rxjs';
import { Component, OnChanges, Input } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnChanges {
  groups$!: Observable<DeviceGroup[]>
  @Input() category: number

  constructor(
    private deviceService: DeviceService) { }

  trackByGroupId(_index: number, group: DeviceGroup) {
    return group.id;
  }

  // The list is reused when going from one group to another
  ngOnChanges() {
    this.groups$ = this.deviceService.getGroupsByParent(this.category);
  }

}
