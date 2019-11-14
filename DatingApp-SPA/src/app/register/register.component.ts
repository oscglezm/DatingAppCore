import { Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  // model: any = {};
  user: User;

  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  // tslint:disable-next-line: no-shadowed-variable
  constructor( private AuthService: AuthService,
               private alertify: AlertifyService,
               private fb: FormBuilder,
               private router: Router
                ) {

                 }

  ngOnInit() {
    // replaced by this method
    /*this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, this.passwordMatchValidator);*/

    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({

      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }


  register() {

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.AuthService.register(this.user).subscribe(() => {
          this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.AuthService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

   /* console.log(this.model);
    this.AuthService.register(this.model).subscribe(() =>{
     this.alertify.success('registration successful');
    }, error => {
      this.alertify.error(error);
    });
    */
    // console.log(this.registerForm.value);

  }

  cancel(){
    this.cancelRegister.emit(false);
    this.alertify.warning('cancelled');
  }


}
