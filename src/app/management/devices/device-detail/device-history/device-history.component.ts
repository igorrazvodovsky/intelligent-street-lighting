import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../../types'

@Component({
  selector: 'device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.scss']
})
export class DeviceHistoryComponent implements OnInit {
  activities: Activity[] = [
    {
      type: 'user',
      subject: 'Esther Howard',
      details: 'Changed profile to Busy street.',
      avatar: 'https://uifaces.co/our-content/donated/Xp0NB-TL.jpg',
      object: {},
      created: new Date(),
    },
    {
      type: 'user',
      subject: 'Annette Black',
      details: 'Changed profile to Daugavpils default.',
      avatar: 'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=61eaea85f1aa3d065400179c78163f15',
      object: {},
      created: new Date(Date.now() - 46400000),
    },
    {
      type: 'user',
      subject: 'Kristin Watson',
      details: 'Changed Busy street profile configuration.',
      avatar: 'https://uifaces.co/our-content/donated/oLkb60i_.jpg',
      object: {},
      created: new Date(Date.now() - 56100000),
    },
    {
      type: 'device',
      subject: 'System',
      details: 'Installed',
      object: {},
      created: new Date(Date.now() - 78100000),
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
