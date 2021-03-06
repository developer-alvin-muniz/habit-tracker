import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable, of, tap} from "rxjs";
import {HabitRecord} from "../models/HabitRecord";
import {Resolve} from "@angular/router";
import {DatePipe} from "@angular/common";
import {environment} from "../../environments/environment";
import {HabitModel} from "../models/habit.model";

@Injectable({
  providedIn: 'root'
})
export class HabitService implements Resolve<any> {

  habits$ = this.http.get<HabitModel[]>(environment.apiEndpoint + '/habits')
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(error => {
        return EMPTY;
      })
    );

  projectRecords?: Map<string, boolean>;
  projectRecordsList?: HabitRecord[];

  constructor(private http: HttpClient) { }

  resolve() {
    return this.getAllCompletedHabits();
  }

  postCompletedHabit(habitRecord: HabitRecord): Observable<HabitRecord> {
    return this.http.post<HabitRecord>(environment.apiEndpoint + '/habits/entries/save', habitRecord)
  }

  saveHabit(habit: HabitModel): Observable<HabitModel> {
    return this.http.post<HabitModel>(environment.apiEndpoint + '/habits/save', habit);
  }

  getAllCompletedHabits(): Observable<HabitRecord[]> {
    return this.http.get<HabitRecord[]>(environment.apiEndpoint + '/habits/entries');
  }

  saveStartDate(habit: HabitModel): Observable<HabitModel> {
    return this.http.put<HabitModel>(environment.apiEndpoint + '/habits/save', habit);
  }
}
