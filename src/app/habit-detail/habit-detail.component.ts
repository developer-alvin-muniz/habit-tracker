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
  // mySubscription;

  constructor(private routes: ActivatedRoute, private router: Router, private projectService: HabitService) {

  }

  // TODO - Group saelected dates in an array I should have available the
  //  current month display as well as an array of dates displayed
  ngOnInit(): void {

    this.routes.data.subscribe(
      (response: any) => {
        console.log(response)
        this.projectRecords = response.projectRecords;
      }
    )


  }

  completedMetric(metricStatus: boolean) {

    if(this.selected)
    {
      const datePipe = new DatePipe('en-US');

      const convertDate = datePipe.transform(this.selected,'MM-dd-YYYY') as string;
      // this.projectRecords.set((this.selected as Date).toDateString(), metricStatus);

      this.projectService.postDates({
        date: this.selected,
        completed: metricStatus
      } as HabitRecord).subscribe(
        result => {
          console.log('success', result)
        }, () => {},
        () => {
          // this.router.navigateByUrl(this.router.url);
          // window.location.reload();
        }
      );
    }

    console.log('completed metric');

  }


  setSelectedDate(selectedDate: Date) {
    this.selected = selectedDate;
  }
}
