import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export enum Fill {
  Alarm = 'lightning',
  Cancel = 'cancel',
  User = 'user'
}

export enum Bold {
  Menu = 'menu',
  Dashboard = 'dashboard',
  Devices = 'planet',
  Profiles = 'profile',
  Reports = 'chart',
  Notification = 'notification',
  User = 'user',
  Search = 'search',
  Admin = 'gear',
  Filter = 'filter',
  Layers = 'layers',
  ChevronLeft = 'chevronLeft',
  ChevronRight = 'chevronRight',
  Map = 'map',
  Edit = 'edit',
  Download = 'download',
  QR = 'qr',
  Plus = 'plus',
  Minus = 'minus',
  Close = 'close',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  More = 'more',
  MoreCircle = 'moreCircle',
  MoreVertical = 'moreVertical',
  City = 'city',
  Info = 'info',
  Check = 'check'
}

export enum Medium {
  Dropdown = 'dropdown',
  Close = 'close',
  Cancel = 'cancel',
  Location = 'location',
  Coordinated = 'coordinates',
  Info = 'info',
  Trash = 'trash',
  Chart = 'chart',
  Alert = 'alert',
  History = 'history',
  Profile = 'profile',
  Warning = 'warning',
  Ticket = 'ticket',
  Filter = 'filter',
  QR = 'qr',
  Plus = 'plus',
  Edit = 'edit'
}

export enum Regular {
  OpenInNew = 'openInNew',
  Check = 'check',
  Location = 'location',
  Lock = 'lock',
  Message = 'message',
  User = 'user',
  ChevronRight = 'chevronRight',
  ChevronRightSmall = 'chevronRightSmall',
  ChevronDownSmall = 'chevronDownSmall',
  RadioOn = 'radioOn',
  RadioOff = 'radioOff',
  Move = 'move',
  Trash = 'trash',
  Firmware = 'firmware',
  Sun = 'sun',
  Enter = 'enter',
  Edit = 'edit',
  CheckCircle = 'checkCircle',
  CancelCircle = 'cancelCircle',
  Ticket = 'ticket',
  Alert = 'alert',
  Power = 'power',
  ArrowThinUp = 'arrowThinUp',
  ArrowThinDown = 'arrowThinDown',
  Link = 'link',

}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons('Fill', Object.values(Fill), '../assets/icons/fill');
    this.loadIcons('Regular', Object.values(Regular), '../assets/icons/regular');
    this.loadIcons('Medium', Object.values(Medium), '../assets/icons/medium');
    this.loadIcons('Bold', Object.values(Bold), '../assets/icons/bold');
  }

  private loadIcons(iconSet: string, iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key + iconSet, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
