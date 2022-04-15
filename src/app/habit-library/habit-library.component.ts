import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {catchError, EMPTY, Observable, of, Subscription} from "rxjs";
import {HabitModel} from "../models/habit.model";
import {HabitService} from "../shared/habit.service";
import {HabitRecord} from "../models/HabitRecord";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-habit-library',
  templateUrl: './habit-library.component.html',
  styleUrls: ['./habit-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HabitLibraryComponent implements OnInit, OnDestroy{

  // selectedHabit?: HabitModel;
  selectedDate?: Date;

  newHabit: string | undefined;

  user: User | null = null;
  userEventsSubscription: Subscription | null = null;


  habits$ = this.habitService.habits$
    .pipe(
      catchError(err => {
        return EMPTY;
      })
    )

  constructor(private userService:UserService, private habitService: HabitService, private router: Router) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }

  getCurrentDate() {
    return new Date();
  }

  saveHabit() {
    const savedHabit = {
      name: this.newHabit
    } as HabitModel

    this.habitService.saveHabit(savedHabit).subscribe(
      () => {
        console.log('habit saved')
      },
      ()=> {
        console.log('habit not saved')
      }, ()=>{

      }
    )
  }

  postCompletedHabit(completed: boolean, habit: HabitModel) {
    const completedRecord = {
      completed: completed,
      habitId: habit?.id,
      date: this.getCurrentDate()
    } as HabitRecord;

    this.habitService.postCompletedHabit(completedRecord).subscribe(
      result => {console.log('saved habit record', result)},
      error => {},
      ()=> {
        this.router.navigate(['/habit-detail/'+habit.id] );
      }
    )


  }

  logout($event: Event) {
    $event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  refreshList(habit: HabitModel) {
    this.habits$ = this.habitService.habits$.pipe(
      catchError(err => {
        return EMPTY;
      })
    )
  }
}
