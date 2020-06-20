import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/auth/login/login.component';
import { RegisterComponent } from '../app/components/auth/register/register.component';
import { RoomsComponent } from '../app/components/rooms/rooms.component';
import { CreateRoomComponent } from '../app/components/create-room/create-room.component';
import { MyroomsComponent } from '../app/components/myrooms/myrooms.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'createroom', component: CreateRoomComponent},
  {path: 'myrooms', component: MyroomsComponent},
  {path: 'rooms', component: RoomsComponent},
  {path: 'rooms/:name', component: RoomComponent},
  {path: 'rooms/:name/delete', component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
