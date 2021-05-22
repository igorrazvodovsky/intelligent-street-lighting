import { Component, OnInit } from '@angular/core';

export interface Activity {
  type: string;
  subject: string;
  details: string;
  object: {};
  avatar?: string;
  created: Date;
}

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [
    {
      type: 'user',
      subject: 'Esther Howard',
      details: 'Changed Busy street profile configuration.',
      avatar: 'https://uifaces.co/our-content/donated/Xp0NB-TL.jpg',
      object: {},
      created: new Date(),
    },
    {
      type: 'user',
      subject: 'Annette Black',
      details: 'Changed Busy street profile configuration.',
      avatar: 'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=61eaea85f1aa3d065400179c78163f15',
      object: {},
      created: new Date('1/1/16'),
    },
    {
      type: 'user',
      subject: 'Kristin Watson',
      details: 'Changed Busy street profile configuration.',
      avatar: 'https://uifaces.co/our-content/donated/oLkb60i_.jpg',
      object: {},
      created: new Date('1/1/16'),
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
