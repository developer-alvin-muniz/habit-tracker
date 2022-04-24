import { TestBed } from '@angular/core/testing';

import { HabitService } from './habit.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {HabitRecord} from "../models/HabitRecord";
import {environment} from "../../environments/environment";

fdescribe('HabitService', () => {
  let habitService: HabitService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    habitService = TestBed.inject(HabitService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(habitService).toBeTruthy();
  });

  fdescribe('should test endpoints', () => {
    it('should post completed habit record', () => {
      const habitRecord = {
        date: new Date('2022-12-10'),
        habitId: 2,
        completed: true
      } as HabitRecord;

      let actualHabit: HabitRecord | undefined;

      habitService.postCompletedHabit(habitRecord).subscribe(fetchedHabit => (actualHabit = fetchedHabit));

      const req = http.expectOne({ method: 'POST', url: `${environment.mockApiEndpoint}/habitRecord` })
      expect(req.request.body).toEqual(habitRecord);
      req.flush(habitRecord);
      http.verify()

    })
  })
});
