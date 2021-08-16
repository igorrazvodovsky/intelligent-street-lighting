import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'initialisation-sc',
  templateUrl: './initialisation-sc.component.html',
  styleUrls: ['./initialisation-sc.component.scss']
})
export class InitialisationScComponent implements OnInit {
  date = new FormControl(new Date());
  SCModel = 'SCM24UL8-868-44'
  SCModels = [
    'SCM24UL8-868-44',
    'MSC2M (Ethernet)',
    'SC3M24UL8-868-44',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
