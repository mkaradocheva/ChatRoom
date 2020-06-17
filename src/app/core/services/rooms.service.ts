import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Room } from 'src/app/components/shared/models/room.model';
import { Question } from 'src/app/components/shared/models/question.model';
import { ListRoom } from 'src/app/components/shared/models/list-rooms.model';
import { CreateRoom } from 'src/app/components/shared/models/create-room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    private _room: Room;
    private _questionsForRoom: Question[] = [];
    private _allRooms: ListRoom[] = [];
    private _roomSubscriptions: Subscription[] = [];

    roomChanged = new Subject<Room>();
    questionChanged = new Subject<Question[]>();
    allRoomsChanged = new Subject<ListRoom[]>();

    constructor(
        private afDb: AngularFirestore,
        private router: Router,
        private snackbar: MatSnackBar
        ) {}

    ngOnInit(){
    }

    fetchRoomById(roomId: string){
        this._roomSubscriptions.push(this.afDb
            .collection<Room>('rooms',
            (ref) => ref.where('id', '==', roomId).limit(1))
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map((doc) => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        }
                    })
                })
            ).subscribe((rooms) => {
                if(rooms.length > 0){
                    this._room = rooms[0];
                    this.roomChanged.next({...this._room});
                    this.router.navigate(['/rooms', this._room.id]);
                } else {
                    this.snackbar.open("No such room exists!", "Close", {
                        duration: 3000
                    });
                }
            }))
    }

    fetchAllRooms(){
        this._roomSubscriptions.push(this.afDb.collection<ListRoom>('rooms')
        .valueChanges()
        .subscribe((rooms) => {
            this._allRooms = rooms;
            this.allRoomsChanged.next([...this._allRooms]);
        }));
    }

    fetchQuestionsForRoom(roomId: string){
        this._roomSubscriptions.push(this.afDb.collection<Question>('questions', (ref) => ref
        .where('roomId', '==', roomId)
        .orderBy('createdOn', 'asc'))
        .valueChanges()
        .subscribe((questions) => {
            this._questionsForRoom = questions;
            this.questionChanged.next([...this._questionsForRoom]);
        }));
    }

    addQuestion(payload: Question){
        this.afDb.collection<Question>('questions').add(payload)
        .then((data) => {
            this.fetchQuestionsForRoom(payload.roomId);
            this.snackbar.open('Question added!', 'Undo', {
                duration: 2000
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addRoom(payload: CreateRoom){
        this._roomSubscriptions.push(this.afDb.collection('rooms', (ref) => ref
        .where('name', '==', payload.name))
        .valueChanges()
        .subscribe((data) => {
            if(data.length > 0){
                this.snackbar.open(`Room with this name: ${payload.name} already exists!`, 'Undo', {
                    duration: 2000
                });
            } else {
                this.afDb.collection<CreateRoom>('rooms').add(payload)
                .then((data) => {
                    this.snackbar.open(`Room with name: ${payload.name} created!`, 'Undo', {
                        duration: 2000
                    });
                    this.router.navigate(['/']);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }))
    }

    cancelSubscriptions(){
        this._roomSubscriptions.forEach((s) => s.unsubscribe());
    }
}