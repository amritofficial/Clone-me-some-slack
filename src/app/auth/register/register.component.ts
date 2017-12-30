import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { OnChanges } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnChanges {
  
  errorMsg: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  register(registerForm: any) {
    const email = registerForm.email;
    const password = registerForm.password;
    const displayName = registerForm.displayName;
    console.log(email + password + displayName);
    this.authService.registerUser(email, password)
    .then(resolve => this.router.navigate(['home']))
    .catch(error => this.errorMsg = error.message);  
  }

  // registerForm(registerForm: any) {
  //   this.email = registerForm.email;
  //   this.password = registerForm.password;
  //   this.displayName = registerForm.displayName;
  // }

  ngOnChanges() {
    
  }

}
