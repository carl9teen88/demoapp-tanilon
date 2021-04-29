import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoVM } from '../common/models/user-info';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})

export class NewUserComponent implements OnInit {

  userInfo = new UserInfoVM();

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  saveUser() {
    if (this.isValid())
      this.userService
        .addUser({
          usr_address: this.userInfo.address,
          usr_email: this.userInfo.email,
          usr_fullname: this.userInfo.fullname
        })
        .subscribe(user => {
          if (user) this.router.navigate(['/users']);
        });
  }

  isValid() {
    return this.userInfo.fullname && this.userInfo.email && this.userInfo.address;
  }
}
