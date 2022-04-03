import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ProjectRecord} from "../models/ProjectRecord";
import {
  MatCalendar, MatCalendarCell, MatCalendarCellClassFunction,
  MatCalendarCellCssClasses
} from "@angular/material/datepicker";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailComponent implements OnInit {
  selected: Date | null = null;
  projectRecords: Map<string, boolean> = new Map();
  //@ts-ignore
  // @ViewChild('calendar')  calendar: MatCalendar<Date>;
  date : any;
  selectedDate: any;


  constructor() {
  }

  // TODO - Group saelected dates in an array I should have available the
  //  current month display as well as an array of dates displayed
  ngOnInit(): void {
  }

  // dateClass can be used, and we can specify whether we completed or
  // failed to complete an objective in the date map?
  // so maybe a pop over will show up

  display($event: any) {
    // console.log($event)
    console.log(this.selected)
  }

  datesToHighlight = ["2019-01-22T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-28T18:30:00.000Z", "2019-01-24T18:30:00.000Z", "2019-01-23T18:30:00.000Z", "2019-01-22T18:30:00.000Z", "2019-01-25T18:30:00.000Z"];

  onSelect(event:any){
    console.log(event);
    this.selectedDate = event;
  }

  completedMetric(metricStatus: boolean) {
    this.projectRecords.set((this.selected as Date).toDateString(), metricStatus);
  }


//   Issue
//   I have an array with a list of dates with flag for availability.
//
//   For Ex: –
//
//   [
//     {
//       ...
//         date : 2021-11-18
//   isAvailable : true,
// ...
// },
// {
// ...
//   date : 2021-11-19
//   isAvailable : false,
// ...
// }
// ]
//
// I have to use this data to add an icon(green/red) below dates in datepicker when isAvailable is true or false.
//
//   I have to use angular material datepicker.
//
//   I don’t know where to begin.
//
//
//
//   Solution
// TS

dateArr = [
  {
    date: "2021-11-18",
    isAvailable: true
  },
  {
    date: "2021-11-19",
    isAvailable: false
  }
]

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'special-date' : '';
    }

    return '';
  };
}
