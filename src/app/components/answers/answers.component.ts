import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Answer } from '../shared/models/answer.model';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})

export class AnswersComponent implements OnInit {
    questionAnswers: Answer[];
    questionAnswersSub: Subscription;
    question: string;
    questionId: string;
    roomName: string;

    constructor(private route: ActivatedRoute, 
        private questionsService: QuestionsService
        ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.question = params['question'];
      this.roomName = params['name'];
    });

    this.questionsService.fetchAnswersForQuestion(this.question);
    this.questionAnswersSub =  this.questionsService.answersChanged.subscribe((answers) => {
      this.questionAnswers = answers;
    }); 
  }

  ngOnDestroy(){
    this.questionAnswersSub.unsubscribe();
    this.questionsService.cancelSubscriptions();
  }
}
