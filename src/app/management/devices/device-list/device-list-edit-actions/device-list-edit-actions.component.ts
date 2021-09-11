import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'device-list-edit-actions',
  templateUrl: './device-list-edit-actions.component.html',
  styleUrls: ['./device-list-edit-actions.component.scss']
})
export class DeviceListEditActionsComponent {

  constructor(private _bottomSheetRef: MatBottomSheetRef<DeviceListEditActionsComponent>) { }

  doStuff(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}

