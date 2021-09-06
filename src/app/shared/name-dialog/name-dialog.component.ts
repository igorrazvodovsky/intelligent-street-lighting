import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string; mode: 'create' | 'edit'; entity?: string }) { }

  ngOnInit(): void {
  }

}
