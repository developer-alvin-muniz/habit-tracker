import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor(fb: FormBuilder) {
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

  display() {
    console.log(this.usernameCtrl);
    console.log(this.passwordCtrl);
  }
}
