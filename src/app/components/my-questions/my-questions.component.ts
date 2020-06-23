import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {
  private myQuestionsSubscription: Subscription;
  questions = [];

  constructor(
    private questionsService: QuestionsService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    let currentUser = this.authService.getCurrentUser();
    
    this.questionsService.fetchMyQuestions(currentUser);
    this.myQuestionsSubscription = this.questionsService.myQuestionsChanged.subscribe((questions) => {
      this.questions = questions;
    });
  }
}
