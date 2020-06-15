import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from 'src/app/components/shared/room.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    constructor(private afDb: AngularFirestore) {}

    ngOnInit(){
    }

    fetchRoomById(roomId: string){
        debugger;
        this.afDb.collection<Room>('rooms', 
        (ref) => ref.where('id', '==', roomId))
            .snapshotChanges()
            .subscribe((data)=>{
                console.log(data);
            })
    }
}