import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DeviceGroup } from '~local/types'
import { DeviceService } from '~local/services/device.service';

@Component({
  selector: 'group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  groups$!: Observable<DeviceGroup[]>
  groups!: DeviceGroup[]
  @Input() category: number

  constructor(
    private deviceService: DeviceService) { }

  trackByGroupId(_index: number, group: DeviceGroup) {
    return group.id;
  }

  ngOnInit() {
    this.groups$ = this.deviceService.getGroupsByParent(this.category);
    this.groups$.pipe(takeUntil(this.destroy$)).subscribe(groups => this.groups = groups)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
