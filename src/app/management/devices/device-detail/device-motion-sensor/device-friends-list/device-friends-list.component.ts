import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'device-friends-list',
  templateUrl: './device-friends-list.component.html',
  styleUrls: ['./device-friends-list.component.scss']
})
export class DeviceFriendsListComponent implements OnInit {
  friends = ["6710", "6711", "6712", "6713"];
  newFriendOptions: string[] = ['6715', '6716', '6717'];

  addFriend(newFriend: string) {
    if (newFriend) {
      this.friends.push(newFriend);
    }
  }

  removeFriend(friend: string) {
    const index = this.friends.indexOf(friend);
    this.friends.splice(index, 1);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
