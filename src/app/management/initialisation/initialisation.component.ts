import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initialisation',
  templateUrl: './initialisation.component.html',
  styleUrls: ['./initialisation.component.scss']
})
export class InitialisationComponent implements OnInit {
  type = 'lamp'

  constructor() { }

  ngOnInit(): void {
  }

}
