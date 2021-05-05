import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoVM } from '../common/models/user-info';
import { EmailHelpers } from '../../utils/email-validation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

  userInfo = new UserInfoVM();

  emailHelper = new EmailHelpers();

  constructor(private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveUser() {
    if (this.isValid()) {
      if (!this.emailHelper.isEmail(this.userInfo.email)) {
        this.openSnackBar(`Email address : ${this.userInfo.email} is invalid.`, false);
      }
      else {
        this.userService
          .addUser({
            usr_address: this.userInfo.address,
            usr_email: this.userInfo.email,
            usr_fullname: this.userInfo.fullname
          })
          .subscribe(user => {
            if (user) {
              //this.router.navigate(['/users']);
              this.openSnackBar("Successfully saved!", true);
            }
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

  isValid() {
    return this.userInfo.fullname && this.userInfo.email && this.userInfo.address;
  }
}
