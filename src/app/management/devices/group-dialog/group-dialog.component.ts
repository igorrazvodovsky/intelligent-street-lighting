import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  parent: string = "root"
  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: any }) { }

  ngOnInit(): void {
  }

}
