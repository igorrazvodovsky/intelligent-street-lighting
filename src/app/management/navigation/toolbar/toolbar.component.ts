import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event } from '@angular/router';
import { AppStateService } from '~local/services/app-state.service'
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  modalMode = false;
  modalModeRoutes = ['/management/initialise']
  isHandset: boolean
  private destroy$ = new Subject<void>();

  @Output() navToggle = new EventEmitter<void>();

  constructor(
    public router: Router,
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.checkRoute()
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      this.checkRoute()
    });
    this.appStateService.isHandset.pipe(takeUntil(this.destroy$)).subscribe(value =>
      this.isHandset = value
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
