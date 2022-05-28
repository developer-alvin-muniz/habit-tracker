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
    return new Date(2022,4,28);
    // return new Date();
  }

  saveHabit() {
    const savedHabit = {
      name: this.newHabit
    } as HabitModel

    this.habitService.saveHabit(savedHabit).subscribe(
      (response) => {
        console.log(response, 'saved');
      },
      ()=> {
      }, ()=>{
      }
    )
  }

  postCompletedHabit(completed: boolean, habit: HabitModel) {
    const completedRecord = {
      name: habit.name,
      completed: completed,
      habitId: habit?.id,
      completionDate: this.getCurrentDate()
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

  saveStartDate(habit: HabitModel, $event: any) {
    if(!!$event.value) {
      habit.startDate = $event.value
      this.habitService.saveStartDate(habit)
        .subscribe(habit => {
          console.log('updated habit')
        });
    }

  }
}
