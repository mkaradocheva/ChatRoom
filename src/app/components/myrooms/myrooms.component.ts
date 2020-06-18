import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-myrooms',
  templateUrl: './myrooms.component.html',
  styleUrls: ['./myrooms.component.scss']
})
export class MyroomsComponent implements OnInit {
  myRoomsSubscription: Subscription;

  constructor(private roomsService: RoomsService,
    private authService: AuthService) { }
  rooms;

  ngOnInit(): void {
    let currentUser = this.authService.getCurrentUser();
    this.roomsService.fetchMyRooms(currentUser);
    this.myRoomsSubscription = this.roomsService.myRoomsChanged.subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

}
