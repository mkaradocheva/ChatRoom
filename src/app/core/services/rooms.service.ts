import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Subject } from 'rxjs';
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

    fetchRoomByName(roomName: string){
        this._roomSubscriptions.push(this.afDb.collection<Room>('rooms', (ref) => ref
        .where('name', '==', roomName))
        .valueChanges()
        .subscribe((rooms) => {
          this._room = rooms[0];
        //   this.allRoomsChanged.next([...this._room]);
        })
      )
    }

    fetchAllRooms(){
        this._roomSubscriptions.push(this.afDb.collection<ListRoom>('rooms')
        .valueChanges()
        .subscribe((rooms) => {
            this._allRooms = rooms;
            this.allRoomsChanged.next([...this._allRooms]);
        }));
    }

    fetchQuestionsForRoom(roomName: string){
        this._roomSubscriptions.push(this.afDb.collection<Question>('questions', (ref) => ref
        .where('roomName', '==', roomName)
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
        this.fetchQuestionsForRoom(payload.roomName);
        this.snackbar.open('Question added!', 'OK', {
          duration: 2000
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }

    addRoom(payload: CreateRoom){
        this._roomSubscriptions.push(this.afDb.collection('rooms', (ref) => ref
        .where('name', '==', payload.name))
        .valueChanges()
        .subscribe((data) => {
            if(data.length > 0){
                this.snackbar.open(`Room with this name: ${payload.name} already exists!`, 'OK', {
                    duration: 2000
                });
            } else {
                this.afDb.collection<CreateRoom>('rooms').add(payload)
                .then((data) => {
                    this.snackbar.open(`Room with name: ${payload.name} created!`, 'OK', {
                        duration: 2000
                    });
                    this.router.navigate(['/rooms']);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }))
    }

    deleteRoom(roomName: string){
        this.afDb.collection("rooms").doc(roomName).delete();
    }

    cancelSubscriptions(){
        this._roomSubscriptions.forEach((s) => s.unsubscribe());
    }
}