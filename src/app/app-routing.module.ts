import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { ProfileComponent } from './profile/profile.component';
import { MyroomsComponent } from './myrooms/myrooms.component';
import { RoomsComponent } from './rooms/rooms.component';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'createroom', component: CreateRoomComponent},
  {path: 'myprofile', component: ProfileComponent},
  {path: 'myrooms', component: MyroomsComponent},
  {path: 'rooms', component: RoomsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
