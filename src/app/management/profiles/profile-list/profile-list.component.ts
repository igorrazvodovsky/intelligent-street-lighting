import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../../types'
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  profiles$!: Observable<Profile[]>;

  constructor(
    private service: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profiles$ = this.service.getProfiles();
  }

}
