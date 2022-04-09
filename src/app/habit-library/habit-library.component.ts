import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {catchError, EMPTY, Observable} from "rxjs";
import {HabitModel} from "../models/habit.model";
import {HabitService} from "../shared/habit.service";
import {HabitRecord} from "../models/HabitRecord";

@Component({
  selector: 'app-habit-library',
  templateUrl: './habit-library.component.html',
  styleUrls: ['./habit-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HabitLibraryComponent {

  // selectedHabit?: HabitModel;
  selectedDate?: Date;


  habits$ = this.habitService.habits$
    .pipe(
      catchError(err => {
        return EMPTY;
      })
    )

  constructor(private habitService: HabitService) { }

  // ngOnInit(): void {
  //   this.habits$ = this.habitService.habits$;
  // }

  getCurrentDate() {
    return new Date();
  }

  postCompletedHabit(completed: boolean, habit: HabitModel) {
    const completedRecord = {
      completed: completed,
      habitId: habit?.id,
      date: this.getCurrentDate()
    } as HabitRecord;

    this.habitService.postCompletedHabit(completedRecord).subscribe(
      result => {console.log('saved habit record', result)}
    )
  }
}
