import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '~local/services/city.service'

@Component({
  selector: 'group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {
  parent: string = "root"
  cityName: string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: any },
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.cityName = this.cityService.city.name
  }

}
