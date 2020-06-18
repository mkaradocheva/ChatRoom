import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  createForm;

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private authService: AuthService
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
    const author = this.authService.getCurrentUser();

    this.roomsService.addRoom({name, description, author});
  }
}

