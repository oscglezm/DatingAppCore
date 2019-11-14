import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../../_models/user';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  User: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm; // access the form: editForm
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event']) // show message to user about to leave a section without save changes  Sec 10.(98)
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }



  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.User = data['User'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  UpdateUser() {
    // console.log(this.User);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.User)
    .subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.User);
      }, error => {
        this.alertify.error(error);
      });
  }

  updateMainPhoto(photoUrl){
    this.User.photoUrl = photoUrl;
  }

}
