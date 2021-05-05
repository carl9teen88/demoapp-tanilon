import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoVM } from '../common/models/user-info';
import { EmailHelpers } from '../../utils/email-validation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId = "";

  userInfo = new UserInfoVM();

  emailHelper = new EmailHelpers();

  constructor(private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser() {
    if (this.isValid()) {
      if (!this.emailHelper.isEmail(this.userInfo.email)) {
        this.openSnackBar(`Email address : ${this.userInfo.email} is invalid.`, false);
      }
      else {
        this.userService
          .updateUser({
            _id: this.userId,
            usr_address: this.userInfo.address,
            usr_email: this.userInfo.email,
            usr_fullname: this.userInfo.fullname
          })
          .subscribe(user => {
            if (user) this.openSnackBar("Successfully updated!", true);
          });
      }
    }
    else {
      this.openSnackBar("Required field(s) empty.", false);
    }
  }

  openSnackBar(msg: string, success: boolean) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'top'
    });
  }


  getUser() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      this.userService.getUser(this.userId).subscribe(user => {
        this.userInfo.address = user.usr_address;
        this.userInfo.email = user.usr_email;
        this.userInfo.fullname = user.usr_fullname;
      });
    });
  }

  isValid() {
    return this.userInfo.fullname && this.userInfo.email && this.userInfo.address;
  }
}
