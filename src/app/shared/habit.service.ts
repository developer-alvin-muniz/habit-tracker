import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {HabitRecord} from "../models/HabitRecord";
import {Resolve} from "@angular/router";
import {DatePipe} from "@angular/common";
import {environment} from "../../environments/environment";
import {HabitModel} from "../models/habit.model";

@Injectable({
  providedIn: 'root'
})
export class HabitService implements Resolve<any> {

  habits$ = this.http.get<HabitModel[]>(environment.mockApiEndpoint + '/habits')
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(error => {
        // TODO set off error message
        console.log(error);
        return EMPTY;
      })
    );

  projectRecords?: Map<string, boolean>;
  projectRecordsList?: HabitRecord[];

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(environment.mockApiEndpoint + '/teams');
  }

  getAllHabits(): Observable<HabitModel[]> {
    return this.http.get<HabitModel[]>(environment.mockApiEndpoint + '/habits')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(error => {
          // TODO set off error message
          console.log(error);
          return EMPTY;
        })
      );
  }

  resolve() {
    return this.fetchAllDates();
  }

  fetchAllDates(): Observable<HabitRecord[]> {
    return this.http.get<HabitRecord[]>(environment.mockApiEndpoint + '/dates');
  }

  postCompletedHabit(habitRecord: HabitRecord): Observable<HabitRecord> {
    return this.http.post<HabitRecord>(environment.mockApiEndpoint + '/habitRecord', habitRecord)
      }

  postDates(projectRecord: HabitRecord):Observable<HabitRecord> {
    return this.http.post<HabitRecord>(environment.mockApiEndpoint + '/dates', projectRecord);
  }
}
