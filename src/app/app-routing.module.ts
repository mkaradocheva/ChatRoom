import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { RegisterComponent } from '../app/components/auth/register/register.component';
import { RoomsComponent } from '../app/components/rooms/rooms.component';
import { CreateRoomComponent } from '../app/components/create-room/create-room.component';
import { MyQuestionsComponent } from '../app/components/my-questions/my-questions.component';
import { RoomComponent } from './components/room/room.component';
import { AnswersComponent } from './components/answers/answers.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createroom', component: CreateRoomComponent },
  { path: 'myquestions', component: MyQuestionsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/:name', component: RoomComponent },
  { path: 'rooms/:name/delete', component: RoomComponent },
  { path: 'rooms/:name/answers/:question', component: AnswersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
