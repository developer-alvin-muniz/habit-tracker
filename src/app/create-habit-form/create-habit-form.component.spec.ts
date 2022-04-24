import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {CreateHabitFormComponent} from './create-habit-form.component';
import {HabitService} from "../shared/habit.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {HabitModel} from "../models/habit.model";

describe('CreateHabitFormComponent', () => {
  let component: CreateHabitFormComponent;
  let fixture: ComponentFixture<CreateHabitFormComponent>;

  // const fakeHabitService = jasmine.createSpyObj<HabitService>('HabitService', ['saveHabit']);

  // @ts-ignore
  const fakeHabitService = {
    saveHabit: () => {}
  } as HabitService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHabitFormComponent],
      providers: [{provide: HabitService, useValue: fakeHabitService}],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CreateHabitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial form set up', () => {
    it('should have a new-habit-form', () => {
      const habitForm = fixture.nativeElement.querySelector('#new-habit-form');
      expect(habitForm).toBeTruthy()
    })
    it('should have a save habit button', () => {
      const habitButton = fixture.nativeElement.querySelector('#save-habit-btn');
      expect(habitButton).toBeTruthy()
    })

    it('should have a save habit button', () => {
      const habitInput = fixture.nativeElement.querySelector('#new-habit-input');
      expect(habitInput).toBeTruthy()
    })

    it('should have a add new button label', () => {
      const newHabitLabel = fixture.nativeElement.querySelector('#new-habit-label');
      expect(newHabitLabel).toBeTruthy()
      expect(newHabitLabel.innerText).toContain('Add New Habit')
    })

  })

  describe('form functions', () => {
    it('saveHabit test', () => {
      const emitEventSpy = spyOn(component.emitSavedHabit, 'emit').and.callThrough();
      spyOn(fakeHabitService, 'saveHabit').and.returnValue(of({name:'Meditation', id: 1} as HabitModel));
      component.newHabit = 'Meditation';
      fixture.detectChanges();
      component.saveHabit();
      fixture.detectChanges();
      expect(fakeHabitService.saveHabit).toHaveBeenCalledWith({name: 'Meditation'}as HabitModel);
      expect(component.savedHabit).toEqual({name:'Meditation', id: 1} as HabitModel);
      expect(emitEventSpy).toHaveBeenCalledWith({name:'Meditation', id: 1} as HabitModel);


    });

    it('input in the newHabit variable should reflect on the form field', () => {
      const hostElement = fixture.nativeElement;
      const habitBtn = hostElement.querySelector('#save-habit-btn');
      const habitInput = hostElement.querySelector('#new-habit-input') as HTMLInputElement;
      habitInput.value = 'Meditation';
      habitInput.dispatchEvent(new Event('input'))
      // habitInput.value = 'Meditation'
      fixture.detectChanges();
      expect(fixture.componentInstance.newHabit).toBe('Meditation')
      expect(habitBtn.disabled).toBeFalse();
    });

    it('save habit button should be disabled if no input in field', () => {
      const hostElement = fixture.nativeElement;
      const habitBtn = hostElement.querySelector('#save-habit-btn');
      const habitInput = hostElement.querySelector('#new-habit-input') as HTMLInputElement;
      habitInput.value = '';
      habitInput.dispatchEvent(new Event('input'))
      // habitInput.value = 'Meditation'
      fixture.detectChanges();
      expect(habitBtn.disabled).toBeTrue();
    });
    it('save habit button should not be disabled if  input in field', () => {
      const hostElement = fixture.nativeElement;
      const habitBtn = hostElement.querySelector('#save-habit-btn');
      const habitInput = hostElement.querySelector('#new-habit-input') as HTMLInputElement;
      habitInput.value = 'Meditation';
      habitInput.dispatchEvent(new Event('input'))
      // habitInput.value = 'Meditation'
      fixture.detectChanges();
      expect(habitBtn.disabled).toBeFalse();
    });
  })
});
