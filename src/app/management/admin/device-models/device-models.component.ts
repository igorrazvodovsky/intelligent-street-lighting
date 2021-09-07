import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModelDialogComponent } from '~local/shared/device-model-dialog/device-model-dialog.component';

@Component({
  selector: 'app-device-models',
  templateUrl: './device-models.component.html',
  styleUrls: ['./device-models.component.scss']
})
export class DeviceModelsComponent implements OnInit {
  models = [
    {
      name: "SRL068757L11B032SNMG1",
      type: "Luminaire"
    },
    {
      name: "SRL096740L09B064SNWH1",
      type: "Luminaire"
    },
    {
      name: "SRL068757L11B032SNMG1",
      type: "Luminaire"
    },
    {
      name: "SRL068757L11B032SNMG1",
      type: "Luminaire"
    },
    {
      name: "LC2M2305R",
      type: "Luminaire controller"
    },
    {
      name: "MSLC205RL",
      type: "Luminaire controller"
    },
    {
      name: "SCM24UL8-868-44",
      type: "Segment controller"
    },
    {
      name: "SC3M24UL8-868-44",
      type: "Segment controller"
    },
    {
      name: "SC2M (Ethernet)",
      type: "Segment controller"
    },
    {
      name: "SC3M (Ethernet)",
      type: "Segment controller"
    },
  ]
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DeviceModelDialogComponent, {
      id: 'device-model-dialog',
      data: { id: 1 },
    });
  }
  ngOnInit(): void {
  }

}
