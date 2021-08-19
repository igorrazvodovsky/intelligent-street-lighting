import { Component, OnInit, Input } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Component({
  selector: 'scanner-dialog',
  templateUrl: './scanner-dialog.component.html',
  styleUrls: ['./scanner-dialog.component.scss']
})
export class ScannerDialogComponent implements OnInit {
  @Input() connectedOverlay: CdkConnectedOverlay;

  constructor() { }

  ngOnInit(): void {
    // DEMO
    setTimeout(() =>
      this.close()
      , 1000);
  }

  public close(): void {
    this.connectedOverlay.overlayRef.detach();
  }
}

