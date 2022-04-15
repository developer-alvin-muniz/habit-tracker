import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import { Output, EventEmitter } from '@angular/core';
import {HabitRecord} from "../../models/HabitRecord";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() projectRecords?: HabitRecord[];
  @Output() emitSelectedDate = new EventEmitter<Date>();

  selected: Date | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.projectRecords?.forEach(
      record => {
        this.dateClass(record.date, 'month');
      }
    )

  }
  setSelectedDate = () => {
    if(this.selected) {
      this.emitSelectedDate.emit(this.selected as Date)
    }

  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    const datePipe = new DatePipe("en-US");

    if (view === 'month') {
      // const date = cellDate.getDate();
      const convertDate = datePipe.transform(cellDate,'MM-dd-YYYY') as string;

      let filteredRecords = this.projectRecords?.filter(projectRecord => {
        const convert = datePipe.transform(projectRecord.date,'MM-dd-YYYY') as string;
        return convert == convertDate;
      }) as HabitRecord[];

      if(filteredRecords?.length > 0) {
        return filteredRecords[0]?.completed ? 'achieved' : 'missed';
      }

      return '';
    }

    return '';
  };
}
