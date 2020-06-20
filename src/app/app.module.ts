import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { RegisterComponent } from '../app/components/auth/register/register.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { RoomsComponent } from '../app/components/rooms/rooms.component';
import { CreateRoomComponent } from '../app/components/create-room/create-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MyFirestoreModule } from './firebase.module';
import { RoomComponent } from './components/room/room.component';
import { RoomPostQuestionComponent } from './components/room/room-post-question/room-post-question.component';
import { RoomQuestionComponent } from './components/room/room-question/room-question.component';
import { AnswersComponent } from './components/answers/answers.component';
import { AnswersPostAnswerComponent } from './components/answers/answers-post-answer/answers-post-answer.component';
import { AnswersAnswerComponent } from './components/answers/answers-answer/answers-answer.component';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    RoomsComponent,
    CreateRoomComponent,
    MyQuestionsComponent,
    RoomComponent,
    RoomPostQuestionComponent,
    RoomQuestionComponent,
    AnswersComponent,
    AnswersPostAnswerComponent,
    AnswersAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MyFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
