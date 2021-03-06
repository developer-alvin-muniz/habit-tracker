import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/User";
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;


  constructor(fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.usernameCtrl = fb.control('',Validators.required);
    this.passwordCtrl = fb.control('',Validators.required);

    this.registerForm = fb.group(
      {
        username: this.usernameCtrl,
        password: this.passwordCtrl
      }
    )
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.userService.register(this.usernameCtrl.value, this.passwordCtrl.value).subscribe(
      response => {
        this.router.navigateByUrl('login');
        console.log('USER IS SUCCESSFULLY REGISTERED');
      },
      () => {
        console.log('USER IS NOT REGISTERED');
      },
      () => {
          this.openSnackBar('Registration Successful', 'X');
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
