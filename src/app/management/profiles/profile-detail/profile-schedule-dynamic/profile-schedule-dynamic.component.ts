import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '~local/types'

@Component({
  selector: 'profile-schedule-dynamic',
  templateUrl: './profile-schedule-dynamic.component.html',
  styleUrls: ['./profile-schedule-dynamic.component.scss']
})
export class ProfileScheduleDynamicComponent implements OnInit {
  @Input() schedule: Schedule;
  @Input() first: boolean;
  @Input() last: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
