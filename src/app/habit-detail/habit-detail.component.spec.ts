import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HabitDetailComponent} from './habit-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HabitService} from "../shared/habit.service";
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {of} from "rxjs";
import {HabitRecord} from "../models/HabitRecord";

fdescribe('ProjectDetailComponent', () => {
  let component: HabitDetailComponent;
  let fixture: ComponentFixture<HabitDetailComponent>;

  const route = ({
    snapshot: {
      paramMap: convertToParamMap({
        habitId: '1'
      })
    },
    data: of({
      projectRecords: [
        {habitId: 1, completed: true} as HabitRecord,
        {habitId: 3, completed: false} as HabitRecord
      ]
    })
  }) as unknown as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabitDetailComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{provide: ActivatedRoute, useValue: route}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button that navigates back to the home page', () => {
    const hostElement = fixture.nativeElement;
    const homePageBtn = hostElement.querySelector('#home-page-btn');
  })

  fit('should call on the router to set the habitId and filter appropriately', () => {
    component.ngOnInit();
    expect(component.projectRecords?.length).toEqual(1);
  })
});
