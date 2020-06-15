import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }
}
