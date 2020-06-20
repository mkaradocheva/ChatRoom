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
  myQuestionsSubscription: Subscription;

  constructor(private questionsService: QuestionsService,
    private authService: AuthService) { }
    questions = [];

  ngOnInit(): void {
    let currentUser = this.authService.getCurrentUser();
    this.questionsService.fetchMyRooms(currentUser);
    this.myQuestionsSubscription = this.questionsService.myQuestionsChanged.subscribe((questions) => {
      this.questions = questions;
    });
  }
}
