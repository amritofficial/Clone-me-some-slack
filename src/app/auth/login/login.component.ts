import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(loginForm: any){
    this.authService.loginUser(loginForm.email, loginForm.password)
    .then((resolve) => {
      console.log('Login Success');
      this.router.navigate(['chatRoom']);
    }).catch(error => console.log(error));
  }

}
