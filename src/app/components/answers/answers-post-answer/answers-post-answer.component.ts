import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuestionsService } from 'src/app/core/services/questions.service';

@Component({
  selector: 'app-answers-post-answer',
  templateUrl: './answers-post-answer.component.html',
  styleUrls: ['./answers-post-answer.component.scss']
})
export class AnswersPostAnswerComponent implements OnInit {
  answerForm: FormGroup;
  question: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
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
      this.question = params['question'];
    });
  }

  postAnswer() {
    const text = this.answerForm.value.text;
    const currentUser = this.authService.getCurrentUser();

    this.questionsService.addAnswer({ 
      text: text, 
      createdOn: new Date(), 
      question: this.question, 
      author: currentUser
    });

    this.answerForm.reset();
  }
}