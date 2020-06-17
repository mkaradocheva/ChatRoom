import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  createForm;

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService
    ) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required]
  });
}

  get f(){
    return this.createForm.controls;
  }

  createRoom(){
    const {name, description} = this.createForm.value;

    this.roomsService.addRoom({name, description});
  }
}

