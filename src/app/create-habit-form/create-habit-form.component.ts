import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HabitModel} from "../models/habit.model";
import {catchError, EMPTY} from "rxjs";
import {HabitService} from "../shared/habit.service";

@Component({
  selector: 'app-create-habit-form',
  templateUrl: './create-habit-form.component.html',
  styleUrls: ['./create-habit-form.component.scss']
})
export class CreateHabitFormComponent implements OnInit {

  newHabit?: string;
  savedHabit?: HabitModel;
 @Output() emitSavedHabit = new EventEmitter<HabitModel>();
  constructor(private habitService:HabitService) { }

  ngOnInit(): void {
  }

  saveHabit() {
    const savedHabit = {
      name: this.newHabit
    } as HabitModel

    this.habitService.saveHabit(savedHabit).subscribe(
      (result:HabitModel) => {
        this.savedHabit = result;
      },
      ()=> {
        console.log('habit not saved')
      },
      ()=>{
        this.emitSavedHabit.emit(savedHabit)

      }
    )
  }


}
