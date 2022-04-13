import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./lib/material.module";
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HomeComponent } from './home/home.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { CalendarComponent } from './habit-detail/calendar/calendar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {JwtInterceptor} from "./jwt.interceptor";
import { HabitLibraryComponent } from './habit-library/habit-library.component';
import { CreateHabitFormComponent } from './create-habit-form/create-habit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HabitDetailComponent,
    HomeComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    HabitLibraryComponent,
    CreateHabitFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
