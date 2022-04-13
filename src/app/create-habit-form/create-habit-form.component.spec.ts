import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHabitFormComponent } from './create-habit-form.component';

describe('CreateHabitFormComponent', () => {
  let component: CreateHabitFormComponent;
  let fixture: ComponentFixture<CreateHabitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHabitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHabitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
