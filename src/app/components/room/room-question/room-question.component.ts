import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-room-question',
    templateUrl: './room-question.component.html',
    styleUrls: ['./room-question.component.scss']
})
export class RoomQuestionComponent implements OnInit {
    @Input() questionInfo;
    roomName: string;

    constructor(private route: ActivatedRoute){}

    ngOnInit(){
        this.route.params.subscribe((params: Params) => {
            this.roomName = params['name'];
          });
    }
}