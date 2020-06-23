import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from 'src/app/components/shared/models/question.model';
import { MyQuestion } from 'src/app/components/shared/models/my-question.model';
import { Answer } from 'src/app/components/shared/models/answer.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private _myQuestionsSubscriptions: Subscription[] = [];
    private _questionSubscriptions: Subscription[] = [];
    private _myQuestions: MyQuestion[] = [];
    private _answersForQuestion: Answer[] = [];

    myQuestionsChanged = new Subject<MyQuestion[]>();
    answersChanged = new Subject<Answer[]>();

    constructor(
      private afDb: AngularFirestore,
      private snackbar: MatSnackBar
      ){ }

    fetchMyRooms(author: string) {
        this._myQuestionsSubscriptions.push(this.afDb.collection<Question>('questions', (ref) => ref
          .where('username', '==', author))
          .valueChanges()
          .subscribe((questions) => {
            this._myQuestions = questions;
            this.myQuestionsChanged.next([...this._myQuestions]);
          })
        )
    }

    addAnswer(payload: Answer){
      this.afDb.collection<Answer>('answers').add(payload)
      .then((data) => {
        this.fetchAnswersForQuestion(payload.question);
        this.snackbar.open('Answer added!', 'Undo', {
          duration: 2000
        });
      })
      .catch((err) => {
        console.log(err);
      });
    
    }

    fetchAnswersForQuestion(question: string){
        this._questionSubscriptions.push(this.afDb.collection<Answer>('answers', (ref) => ref
        .where('question', '==', question)
        .orderBy('createdOn', 'asc'))
        .valueChanges()
        .subscribe((answers) => {
            this._answersForQuestion = answers;
            this.answersChanged.next([...this._answersForQuestion]);
        }));
      }

    cancelSubscriptions(){
      this._myQuestionsSubscriptions.forEach((s) => s.unsubscribe());
      this._questionSubscriptions.forEach((s) => s.unsubscribe());
    }
}