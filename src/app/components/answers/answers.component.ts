import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Subscription } from 'rxjs';
import { Answer } from '../shared/models/answer.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})

export class AnswersComponent implements OnInit {
    questionAnswers: Answer[];
    // roomQuestionsSub: Subscription;
    question: string;

    constructor(private route: ActivatedRoute, 
        private roomService: RoomsService
        ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.question = params['question'];
    });

    // this.roomService.fetchQuestionsForRoom(this.roomName);
    // this.roomQuestionsSub =  this.roomService.questionChanged.subscribe((questions) => {
    //   this.roomQuestions = questions;
    // });
  }

//   deleteRoom(roomName: string){
//     this.deleteRoom(roomName);
//   }

//   ngOnDestroy(){
//     this.roomQuestionsSub.unsubscribe();
//     this.roomService.cancelSubscriptions();
//   }
}
