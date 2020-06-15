import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {

    id: string;

    constructor(private route: ActivatedRoute, 
        private roomService: RoomsService
        ){ }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  enterRoom(id: string){
    this.roomService.fetchRoomById(this.id);
  }
}
