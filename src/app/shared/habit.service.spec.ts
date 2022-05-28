import { TestBed } from '@angular/core/testing';

import { HabitService } from './habit.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {HabitRecord} from "../models/HabitRecord";
import {environment} from "../../environments/environment";
import {HabitModel} from "../models/habit.model";

describe('HabitService', () => {
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

  describe('should test endpoints', () => {
    it('should post completed habit record', () => {
      const habitRecord = {
        completionDate: new Date('2022-12-10'),
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
    it('should save new habit', () => {
      const habit = {
        name: 'Meditation'
      } as HabitModel;

      let actualHabit: HabitModel | undefined;

      habitService.saveHabit(habit).subscribe(fetchedHabit => (actualHabit = fetchedHabit));

      const req = http.expectOne({ method: 'POST', url: `${environment.apiEndpoint}/habits/save` })
      expect(req.request.body).toEqual(habit);
      req.flush(habit);
      http.verify()

    })


    fit('should update a habit with a start date', () => {
      const habit = {
        id: 1,
        name: 'Meditation',
      } as HabitModel;

      const updatedHabit = {
        id: 1,
        name: 'Meditation',
        startDate: new Date(2022,4,1)
      } as HabitModel;


      let actualHabit: HabitModel | undefined;
      habitService.saveStartDate(habit).subscribe(updatedHabit => actualHabit = updatedHabit )

      const req = http.expectOne({ method: 'PUT', url: `${environment.apiEndpoint}/habits/save/` + 1 })
      expect(req.request.body).toEqual(habit);
      req.flush(updatedHabit);
      http.verify()
    })

    it('should get all completed habit records', () => {
      const habitRecords = [
        {
        completionDate: new Date('2022-12-10'),
        habitId: 2,
        completed: true
      } as HabitRecord,
        {
          completionDate: new Date('2022-11-10'),
          habitId: 3,
          completed: false
        } as HabitRecord
      ];

      let actualHabits: HabitRecord[] | undefined;

      habitService.getAllCompletedHabits().subscribe(fetchedHabits => (actualHabits = fetchedHabits));

      const req = http.expectOne({ method: 'GET', url: `${environment.mockApiEndpoint}/habitRecord` })
      req.flush(habitRecords);
      http.verify()

    })
    it('should post completed habit record', () => {
      const habitRecord = {
        completionDate: new Date('2022-12-10'),
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
