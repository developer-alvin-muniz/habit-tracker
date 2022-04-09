import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor(fb: FormBuilder, private userService: UserService, private router:Router) {
    this.usernameCtrl = fb.control('',Validators.required);
    this.passwordCtrl = fb.control('',Validators.required);

    this.loginForm = fb.group(
      {
        username: this.usernameCtrl,
        password: this.passwordCtrl
      }
    )
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.userService.loginUser(
      {
        username: this.usernameCtrl.value,
        password: this.passwordCtrl.value
      }
    )
      .subscribe(response => {
          const currentUser = {
            username: this.usernameCtrl.value,
            token: response.jwt,
            id: response.id
          };
          this.userService.storeLoggedInUser(currentUser);
          this.userService.userEvents.next(currentUser);
          this.router.navigate(['/habit-detail']);
        },
        error => {
        console.log('no good')
          // this.authenticationFailed = true;
        }
      );
  }

  // authenticate() {
  //   this.userService.login( this.usernameCtrl.value, this.passwordCtrl.value).subscribe(
  //     response => {
  //       console.log('login successful');
  //       this.router.navigate(['/habit-detail']);
  //     },
  //     error => {
  //       console.log('login unsuccessful');
  //       // this.authenticationFailed = true;
  //     }
  //   );
  // }

}
