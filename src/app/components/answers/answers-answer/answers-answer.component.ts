import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-answers-answer',
    templateUrl: './answers-answer.component.html',
    styleUrls: ['./answers-answer.component.scss']
})
export class AnswersAnswerComponent implements OnInit {
    @Input() answerInfo;
    roomName: string;

    constructor(private route: ActivatedRoute){}

    ngOnInit(){
        this.route.params.subscribe((params: Params) => {
            this.roomName = params['name'];
          });
    }
}