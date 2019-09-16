import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};


  // tslint:disable-next-line: no-shadowed-variable
  constructor(public AuthService: AuthService, private alertify: AlertifyService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.AuthService.login(this.model).subscribe(next => {

      this.alertify.success('Logged in successfully');
    }, error => {
      // console.log('Failed to Login');
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !! token; // if this token is empty, then return false

    return this.AuthService.loggedIn();
  }


  loggedOut() {
    localStorage.removeItem('token');
    this.alertify.message('Logged Out');
    this.router.navigate(['/home']);
  }

}
