import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Question } from 'src/app/components/shared/models/question.model';
import { MyQuestion } from 'src/app/components/shared/models/my-question.model';
import { Answer } from 'src/app/components/shared/models/answer.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private _myQuestionsSubscriptions: Subscription[] = [];
    private _myQuestions: MyQuestion[] = [];
    private _answersForQuestion: Answer[] = [];
    private _questionSubscriptions: Subscription[] = [];
    private questionFromDb: Question;

    myQuestionsChanged = new Subject<MyQuestion[]>();

    constructor(private afDb: AngularFirestore){
    }

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

    fetchAnswersForQuestion(question: string){

  //   fetchQuestionsForRoom(roomName: string){
  //     this._roomSubscriptions.push(this.afDb.collection<Question>('questions', (ref) => ref
  //     .where('roomName', '==', roomName)
  //     .orderBy('createdOn', 'asc'))
  //     .valueChanges()
  //     .subscribe((questions) => {
  //         this._questionsForRoom = questions;
  //         this.questionChanged.next([...this._questionsForRoom]);
  //     }));
  }

    // cancelSubscriptions(){
    //   this._roomSubscriptions.forEach((s) => s.unsubscribe());

    // }
}