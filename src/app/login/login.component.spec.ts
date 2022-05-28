import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../shared/user.service";
import {RouterTestingModule} from "@angular/router/testing";
import {LoginRequestModel, LoginResponse} from "../models/login-request.model";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {HabitLibraryComponent} from "../habit-library/habit-library.component";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeUserService = {
    loginUser: (loginRequest: LoginRequestModel): Observable<LoginResponse> => {
      return of({} as LoginResponse);
    },
    storeLoggedInUser(user: User): void {

    },
    userEvents: new Subject<User>()
  }

  const fakeRouter = jasmine.createSpyObj<Router>('router', ['navigate']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path:'habit-library', component: HabitLibraryComponent}])],
      providers: [
        {
          provide: UserService, useValue: fakeUserService
        },
        {
          provide: Router, useValue: fakeRouter
        }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    it('should call on the user service to login user', () => {
      const usernameCtrl = component.usernameCtrl;
      const passwordCtrl = component.passwordCtrl;
      usernameCtrl.setValue('User');
      passwordCtrl.setValue('Password');
      const userServiceSpy = spyOn(fakeUserService, 'loginUser')
        .and.returnValue(of({
          jwt: '12345',
          id: 1
        } as LoginResponse));

      const storeLoggedInUserSpy = spyOn(fakeUserService, 'storeLoggedInUser')
      const userEventsSpy = spyOn(fakeUserService.userEvents, 'next');
      fixture.detectChanges();
      component.loginUser();

      expect(userServiceSpy).toHaveBeenCalledWith({
        username: 'User',
        password: 'Password'
      } as LoginRequestModel)

      expect(storeLoggedInUserSpy).toHaveBeenCalledWith({
        username: usernameCtrl.value,
        token: '12345',
        id: 1
      });
      expect(userEventsSpy).toHaveBeenCalledWith({
        username: usernameCtrl.value,
        token: '12345',
        id: 1
      });
      expect(fakeRouter.navigate).toHaveBeenCalledWith(['/habit-library']);

    })
  })

  describe('should set up form with initial values', () => {
    it('should set up initial controls', () => {
      expect(component.usernameCtrl).toBeTruthy();
      expect(component.usernameCtrl.enabled).toBeTruthy();
      expect(component.passwordCtrl).toBeTruthy();
      expect(component.passwordCtrl.enabled).toBeTruthy();
    })

    it('should set up initial controls with default values', () => {
      expect(component.usernameCtrl.value).toBe('');
      expect(component.usernameCtrl.hasValidator(Validators.required)).toBeTruthy();
      expect(component.passwordCtrl.value).toBe('');
      expect(component.passwordCtrl.hasValidator(Validators.required)).toBeTruthy();
    })
  })
});
