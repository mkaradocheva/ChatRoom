import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-room-post-question',
  templateUrl: './room-post-question.component.html',
  styleUrls: ['./room-post-question.component.scss']
})
export class RoomPostQuestionComponent implements OnInit {
  questionForm: FormGroup;
  roomId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomsService: RoomsService
  ) { }

  ngOnInit() {
    this.questionForm = this.fb.group({
      text: [ null, [ Validators.required, Validators.minLength(10), Validators.maxLength(70) ] ]
    });
    this.route.params.subscribe((params: Params) => {
      this.roomId = params['id'];
    });
  }

  postQuestion() {
    const text = this.questionForm.value.text;
    const email = localStorage.getItem('email');
    this.roomsService.addQuestion({ 
      text: text, 
      createdOn: new Date(), 
      roomId: this.roomId, 
      username: email 
    });

    this.questionForm.reset();
  }
}