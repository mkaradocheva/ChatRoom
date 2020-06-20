import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Question } from 'src/app/components/shared/models/question.model';
import { MyQuestion } from 'src/app/components/shared/models/my-question.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    private _myQuestionsSubscriptions: Subscription[] = [];
    private _myQuestions: MyQuestion[] = [];
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
}