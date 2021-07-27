import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  currentRoute: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.currentRoute = event['urlAfterRedirects']);
  }

  }
