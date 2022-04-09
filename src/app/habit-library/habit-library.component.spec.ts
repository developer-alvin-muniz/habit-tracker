import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitLibraryComponent } from './habit-library.component';

describe('HabitLibraryComponent', () => {
  let component: HabitLibraryComponent;
  let fixture: ComponentFixture<HabitLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitLibraryComponent ]
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
});
