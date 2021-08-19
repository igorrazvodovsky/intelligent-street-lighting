import { Component, OnInit } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-initialisation',
  templateUrl: './initialisation.component.html',
  styleUrls: ['./initialisation.component.scss']
})
export class InitialisationComponent implements OnInit {
  type = 'lamp'
  isScannerOpen = true
  public readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top' }
    ],
  }

  constructor() { }

  ngOnInit(): void {
  }

  public displayOverlay(): void {
    this.isScannerOpen = true;
  }

  public hideOverlay(): void {
    this.isScannerOpen = false;
  }
}
