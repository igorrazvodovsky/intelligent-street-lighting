import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../types'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileService } from '../../../services/profile.service'

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profile$!: Observable<Profile>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfileService
  ) {}

  ngOnInit() {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProfile(params.get('id')!))
    );
  }

}




