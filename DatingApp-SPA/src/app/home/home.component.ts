import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode= false;

  constructor( private http: HttpClient) { }

  ngOnInit() {
    // this.getValues();
  }

  registerToggle(){
    this.registerMode = true;
  }

/*
  getValues(){
    this.http.get('http://localhost:5001/api/values').subscribe(response => {
      this.values = response;
    }, error =>{
      console.log(error);
    });
  }
*/
  cancelRegisterMode(registerMode: boolean)
  {
    console.log('test')
    this.registerMode = registerMode;
    //this.registerMode = registerMode === 'true';
  }

}
