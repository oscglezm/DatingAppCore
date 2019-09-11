import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  login(){
    console.log(this.model);
    this.AuthService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      //console.log('Failed to Login');
      console.log(error);
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !! token; // if this token is empty, then return false
  }

  loggedOut(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
