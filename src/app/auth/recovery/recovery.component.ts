import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  sent = false

  constructor() { }

  ngOnInit(): void {
  }

}
