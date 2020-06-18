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
    roomName: string;

    constructor(private route: ActivatedRoute, 
        private roomService: RoomsService
        ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roomName = params['name'];
    });

    this.roomService.fetchQuestionsForRoom(this.roomName);
    this.roomQuestionsSub =  this.roomService.questionChanged.subscribe((questions) => {
      this.roomQuestions = questions;
    });
  }

  ngOnDestroy(){
    this.roomQuestionsSub.unsubscribe();
    this.roomService.cancelSubscriptions();
  }
}
