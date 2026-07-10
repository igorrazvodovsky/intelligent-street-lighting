import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '~local/services/profile.service';
import { Profile } from '~local/types'
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss']
})
export class MapLegendComponent implements OnInit, OnDestroy {
  @Input() currentLayer: 'sc' | 'profile' | 'status'
  private destroy$ = new Subject<void>();
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
    },
    {
      name: "Error",
      color: "red"
    },
    {
      name: "Warning",
      color: "violet"
    }
  ]

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.Profiles.pipe(takeUntil(this.destroy$)).subscribe(profiles => {
      this.profiles = profiles;
      this.profiles.forEach((profile: any): string => profile.colour = this.profileService.getProfileColour(profile.id));
    }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
