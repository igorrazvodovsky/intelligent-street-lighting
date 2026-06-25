import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { AppStateService } from '~local/services/app-state.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  modalMode = false;
  modalModeRoutes = ['/management/initialise']
  isHandset: boolean

  @Output() navToggle = new EventEmitter<void>();

  constructor(
    public router: Router,
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.checkRoute()
    this.router.events.subscribe((event: Event) => {
      this.checkRoute()
    });
    this.appStateService.isHandset.subscribe(value =>
      this.isHandset = value
    );
  }

  toggleNav() {
    this.navToggle.emit();
  }

  checkRoute() {
    const url = this.router.routerState.snapshot.url
    if (this.modalModeRoutes.includes(url)) this.modalMode = true
    else this.modalMode = false
  }

}
