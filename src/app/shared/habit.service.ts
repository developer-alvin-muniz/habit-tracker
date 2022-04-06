import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HabitRecord} from "../models/HabitRecord";
import {Resolve} from "@angular/router";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HabitService implements Resolve<any> {

  environment = 'http://localhost:3000';

  projectRecords?: Map<string, boolean>;
  projectRecordsList?: HabitRecord[];

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(this.environment + '/teams');
  }

  resolve() {
    return this.fetchAllDates();
  }

  fetchAllDates(): Observable<HabitRecord[]> {
    return this.http.get<HabitRecord[]>(this.environment + '/dates');
  }

  postDates(projectRecord: HabitRecord):Observable<HabitRecord> {
    return this.http.post<HabitRecord>(this.environment + '/dates', projectRecord);
  }
}
