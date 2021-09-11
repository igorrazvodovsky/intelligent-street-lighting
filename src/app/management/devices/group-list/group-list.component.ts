import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<DeviceGroup[]>
  groups!: DeviceGroup[]
  @Input() category: number

  constructor(
    private deviceService: DeviceService) { }

  ngOnInit() {
    this.groups$ = this.deviceService.getGroupsByParent(this.category);
    this.groups$.subscribe(groups => this.groups = groups)
  }


}
