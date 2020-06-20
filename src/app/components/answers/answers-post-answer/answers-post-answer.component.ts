import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-answers-post-answer',
  templateUrl: './answers-post-answer.component.html',
  styleUrls: ['./answers-post-answer.component.scss']
})
export class AnswersPostAnswerComponent implements OnInit {
  answerForm: FormGroup;
  roomName: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.answerForm = this.fb.group({
      text: [ null, [ Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(150) 
      ] ]
    });
    this.route.params.subscribe((params: Params) => {
      this.roomName = params['name'];
    });
  }

  postAnswer() {
    const text = this.answerForm.value.text;
    const currentUser = this.authService.getCurrentUser();

    console.log(this.roomName)

    // this.roomsService.addQuestion({ 
    //   text: text, 
    //   createdOn: new Date(), 
    //   roomName: this.roomName, 
    //   username: currentUser
    // });

    // this.answerForm.reset();
  }
}