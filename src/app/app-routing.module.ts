import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HabitDetailComponent} from "./habit-detail/habit-detail.component";
import {HomeComponent} from "./home/home.component";
import {HabitService} from "./shared/habit.service";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HabitLibraryComponent} from "./habit-library/habit-library.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habit-detail/:habitId', component: HabitDetailComponent,
  resolve: {
    projectRecords: HabitService
  }},
  {
    path: 'habit-library', component: HabitLibraryComponent,
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
