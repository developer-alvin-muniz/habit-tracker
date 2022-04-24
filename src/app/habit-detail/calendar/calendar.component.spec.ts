import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import {HabitRecord} from "../../models/HabitRecord";

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dateClass', () => {
    it('should return achieved if complete true and missed if false', () => {
      const testDate = new Date('2022-2-20');
      component.projectRecords = [
        {
          completed: true,
          date: testDate
        } as HabitRecord
      ]
      let actual = component.dateClass(testDate, 'month');
      expect(actual).toEqual('achieved');

      component.projectRecords = [
        {
          completed: false,
          date: testDate
        } as HabitRecord
      ]

      actual = component.dateClass(testDate, 'month');
      expect(actual).toEqual('missed');

    })
    it('should return empty string if date is not in habit records', () => {
      const testDate = new Date('2022-2-20');
      const missedDate = new Date('2022-3-20');

      component.projectRecords = [
        {
          completed: true,
          date: testDate
        } as HabitRecord
      ]
      let actual = component.dateClass(missedDate, 'month');
      expect(actual).toEqual('');

      actual = component.dateClass(testDate, 'year');
      expect(actual).toEqual('');

    })
  })

  describe('setSelectedDate ', () => {
    it('should emit the selected date', () => {
      const testDate = new Date('2022-2-20');
      component.selected = testDate;
      const emitSelectedDateSpy = spyOn(component.emitSelectedDate, 'emit')
      component.setSelectedDate();
      expect(emitSelectedDateSpy).toHaveBeenCalledWith(testDate);
    })

    it('should emit the selected date', () => {
      component.selected = null;
      const emitSelectedDateSpy = spyOn(component.emitSelectedDate, 'emit')
      component.setSelectedDate();
      expect(emitSelectedDateSpy).not.toHaveBeenCalled();
    })
  })

  it('ngOnChanges should call on the date class', () => {
    const testDate = new Date('2022-2-20');
    const dateClassSpy = spyOn(component, 'dateClass');
    component.projectRecords = [
      {
        completed: true,
        date: testDate
      } as HabitRecord
    ]

    component.ngOnChanges();
    expect(dateClassSpy).toHaveBeenCalledWith(testDate, 'month');



  })
});
