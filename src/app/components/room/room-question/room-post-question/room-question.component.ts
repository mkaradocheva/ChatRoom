import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-room-question',
    templateUrl: './room-question.component.html',
    styleUrls: ['./room-question.component.scss']
})
export class RoomQuestionComponent implements OnInit {
    @Input() questionInfo;

    constructor(){}

    ngOnInit(){
    }
}