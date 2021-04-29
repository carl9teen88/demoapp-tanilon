import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfoVM } from '../common/models/user-info';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId = "";
  userInfo = new UserInfoVM();

  constructor(private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser() {
    if (this.userInfo.fullname && this.userInfo.email && this.userInfo.address)
      return this.userService
        .updateUser({
          _id: this.userId,
          usr_address: this.userInfo.address,
          usr_email: this.userInfo.email,
          usr_fullname: this.userInfo.fullname
        })
        .subscribe(user => {
          if (user) this.router.navigate(['/users']);
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
}
