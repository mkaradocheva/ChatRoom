import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-room-post-question',
  templateUrl: './room-post-question.component.html',
  styleUrls: ['./room-post-question.component.scss']
})
export class RoomPostQuestionComponent implements OnInit {
  questionForm: FormGroup;
  roomName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.questionForm = this.fb.group({
      text: [ null, [ Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(150) 
      ] ]
    });
    this.route.params.subscribe((params: Params) => {
      this.roomName = params['name'];
    });
  }

  postQuestion() {
    const text = this.questionForm.value.text;
    const currentUser = this.authService.getCurrentUser();

    console.log(this.roomName)

    this.roomsService.addQuestion({ 
      text: text, 
      createdOn: new Date(), 
      roomName: this.roomName, 
      username: currentUser
    });

    this.questionForm.reset();
  }
}