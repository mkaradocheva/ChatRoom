import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Question } from '../shared/models/question.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {
    roomQuestions: Question[];
    roomQuestionsSub: Subscription;
    roomId: string;

    constructor(private route: ActivatedRoute, 
        private roomService: RoomsService
        ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roomId = params['id'];
    });

    this.roomService.fetchQuestionsForRoom(this.roomId);
    this.roomQuestionsSub =  this.roomService.questionChanged.subscribe((questions) => {
      this.roomQuestions = questions;
    });
  }

  ngOnDestroy(){
    this.roomQuestionsSub.unsubscribe();
    this.roomService.cancelSubscriptions();
  }
}
