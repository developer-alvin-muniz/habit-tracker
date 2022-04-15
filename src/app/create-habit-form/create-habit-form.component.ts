import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HabitModel} from "../models/habit.model";
import {catchError, EMPTY} from "rxjs";
import {HabitService} from "../shared/habit.service";

@Component({
  selector: 'app-create-habit-form',
  templateUrl: './create-habit-form.component.html',
  styleUrls: ['./create-habit-form.component.scss']
})
export class CreateHabitFormComponent {

  newHabit?: string;
  savedHabit?: HabitModel;
  @Output() emitSavedHabit = new EventEmitter<HabitModel>();

  constructor(private habitService: HabitService) {
  }

  saveHabit() {
    const savedHabit = {
      name: this.newHabit
    } as HabitModel

    this.habitService.saveHabit(savedHabit).subscribe(
      (result: HabitModel) => {
        this.savedHabit = result;
      },
      () => {
      },
      () => {
        this.emitSavedHabit.emit(this.savedHabit)

      }
    )
  }
}
