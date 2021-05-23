import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor() { }

  makeDevicePopup(data: any): string {
    return `` +
      `<div>Lamp 01/03</div>` +
      `<div>Model KN-3, SN000786345</div>` +
      `<div>Default profile</div>` +
      `<div>Active</div>`
  }
}
