import { Component, OnInit } from '@angular/core';
import { ProfileService } from '~local/services/profile.service';
import { Profile } from '~local/types'

@Component({
  selector: 'map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss']
})
export class MapLegendComponent implements OnInit {
  profiles!: Profile[];
  statuses = [
    {
      name: "Active",
      color: "green"
    },
    {
      name: "Inactive",
      color: "yellow"
    },
    {
      name: "Off",
      color: "grey"
    },
    {
      name: "Not responding",
      color: "violet"
    },
    {
      name: "No power",
      color: "navy"
    },
    {
      name: "Alarm",
      color: "red"
    },
    {
      name: "Unassigned",
      color: "orange"
    }
  ]

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.Profiles.subscribe(profiles => this.profiles = profiles);
  }

}
