// TODO: How devices are added to the group?

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DeviceGroup } from '../../../types'
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<DeviceGroup[]>;

  constructor(
    private service: DeviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.groups$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.service.getGroups();
      })
    );
  }

}
