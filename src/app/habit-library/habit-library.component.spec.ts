import {
  ComponentFixture,
  fakeAsync, inject,
  TestBed,
  tick, waitForAsync
} from '@angular/core/testing';

import { HabitLibraryComponent } from './habit-library.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../shared/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {HabitService} from "../shared/habit.service";
import {HabitModel} from "../models/habit.model";
import createSpy = jasmine.createSpy;
import {HabitRecord} from "../models/HabitRecord";
import {HabitDetailComponent} from "../habit-detail/habit-detail.component";

describe('HabitLibraryComponent', () => {
  let component: HabitLibraryComponent;
  let fixture: ComponentFixture<HabitLibraryComponent>;
  let fakeUserService = {
    userEvents: new BehaviorSubject<User | null>(null),
    logout() {
    }
  } as UserService;

  let fakeHabitService = {
    habits$: of<HabitModel[]>([{name: 'True'} as HabitModel]),
    saveHabit(habit: HabitModel): Observable<HabitModel> {
      return of({} as HabitModel);
    },
    postCompletedHabit(habitRecord: HabitRecord): Observable<HabitRecord> {
      return of({} as HabitRecord);
    },
    saveStartDate(habit: HabitModel): Observable<HabitModel> {
      return of();
    }
  } as HabitService

  const fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitLibraryComponent ],
      imports: [HttpClientTestingModule
        ],
      providers: [
        {
          provide: UserService, useValue: fakeUserService
        },
        {
          provide:HabitService, useValue: fakeHabitService
        },
        { provide: Router, useValue: fakeRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('habit$ should call on habit service', () => {
    expect(component.habits$).toBeInstanceOf(Observable);
  })

  fdescribe('describes start date for a habit', () => {
    fit('should have a date picker for the start date',
      () => {
        const startDatePicker = fixture.nativeElement.querySelector('#start-date-picker');
        expect(startDatePicker).toBeTruthy();
      }
    )
    fit('should have a date picker for the start date', () => {
      const startDatePicker = fixture.elementRef.nativeElement.querySelector('#start-date-input');
      expect(startDatePicker.getAttribute("placeholder")).toEqual('Choose a' +
        ' start date')
      expect(startDatePicker.getAttribute("name")).toEqual("start-date");
    })
    fit('should email saveStartDate when dateChange event emitted', () => {
      const saveStartDateSpy = spyOn(component, 'saveStartDate');
      const startDatePicker = fixture.elementRef.nativeElement.querySelector('#start-date-input');
      startDatePicker.dispatchEvent(new Event('dateChange'));
      expect(saveStartDateSpy).toHaveBeenCalled();
    })

    fit('saveStartDate should call on habitService.saveStartDate()', () => {
      const saveStartDateServiceSpy = spyOn(fakeHabitService, 'saveStartDate');
      component.saveStartDate({id: 1, name: 'Meditation'} as HabitModel, {value: new Date(2022-4-10)});
      expect(saveStartDateServiceSpy).toHaveBeenCalledWith({id: 1, name: 'Meditation', startDate:  new Date(2022-4-10)} as HabitModel);
    })

    fit('saveStartDate should call on habitService.saveStartDate() with null' +
      ' date', () => {
      const saveStartDateServiceSpy = spyOn(fakeHabitService, 'saveStartDate');
      component.saveStartDate({id: 1, name: 'Meditation'} as HabitModel, {value: null});
      expect(saveStartDateServiceSpy).not.toHaveBeenCalled();
    })

  })
  // fit('date picker should have an on blur event to save the date')

  it('should listen to userEvents in ngOnInit', () => {
    component.ngOnInit();
    const user = { username: 'User 1', id: 1 } as User;

    fakeUserService.userEvents.next(user);
    fakeUserService.userEvents.subscribe(() => {
      expect(component.user).withContext('Your component should listen to the `userEvents` observable').toBe(user);
    });
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    spyOn(component.userEventsSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.userEventsSubscription!.unsubscribe).toHaveBeenCalled();
  });

  describe('Function tests', () => {
    it('saveHabit should save a habit through habit service', () => {
      const habitServiceSpy = spyOn(fakeHabitService, 'saveHabit').and.callThrough();
      component.newHabit = 'Meditation';
      fixture.detectChanges();
      component.saveHabit();
      expect(habitServiceSpy).toHaveBeenCalledWith({name: 'Meditation'} as HabitModel);
    });

    it('saveHabit should save a habit through habit service', () => {
      const habitServiceSpy = spyOn(fakeHabitService, 'postCompletedHabit').and.callThrough();
      spyOn(component, "getCurrentDate").and
        .returnValue(new Date("2022-11-02"));
      const expectedRecord = {
        completed: true,
        habitId: 1,
        completionDate: new Date("2022-11-02")
      } as HabitRecord;
      fixture.detectChanges();
      component.postCompletedHabit(true, {id: 1} as HabitModel);
      expect(habitServiceSpy).toHaveBeenCalledWith(expectedRecord);
      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/habit-detail/1']);
    });

    it('logout should call user service and navigate to /login', () => {
      const logoutSpy = spyOn(fakeUserService, 'logout');
      component.logout({
        preventDefault() {
        }
      } as Event)

      expect(logoutSpy).toHaveBeenCalled();
      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/login']);
    })

  })




});
