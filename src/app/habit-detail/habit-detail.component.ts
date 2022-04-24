import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HabitRecord} from "../models/HabitRecord";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HabitService} from "../shared/habit.service";

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrls: ['./habit-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HabitDetailComponent implements OnInit {
  selected: Date | null = null;
  projectRecords?: HabitRecord[];

  constructor(private routes: ActivatedRoute) {

  }

  // TODO - Group saelected dates in an array I should have available the
  //  current month display as well as an array of dates displayed
  ngOnInit(): void {
    const habitId = this.routes.snapshot.paramMap.get('habitId');
    this.routes.data.subscribe(
      (response: any) => {
        // this.routes.paramMap.
        this.projectRecords = response.projectRecords.filter(
          (record: HabitRecord) => record.habitId == Number(habitId)
        );
        console.log(this.projectRecords)
      }
    )
  }

  setSelectedDate(selectedDate: Date) {
    this.selected = selectedDate;
  }
}
