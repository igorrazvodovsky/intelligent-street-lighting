import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-device-model-dialog',
  templateUrl: './device-model-dialog.component.html',
  styleUrls: ['./device-model-dialog.component.scss']
})
export class DeviceModelDialogComponent implements OnInit {

constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  ngOnInit(): void {
  }

}
