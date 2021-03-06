import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { DateFormatter } from 'src/app/utils/date-formater';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList = [];

  dateFormatter  = new DateFormatter();

  displayedColumns: string[] = ['id', 'email', 'fullname', 'address', 'updatedAt', 'action'];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .subscribe(users => {
        this.userList = users.map((user: User, index: Number) => {
          return new UserInfo(
            user._id, 
            user.usr_email, 
            user.usr_fullname, 
            user.usr_address, 
            this.dateFormatter.formatNow(user.updated_at), "action");
        });
      });
  }

  deleteUser(userId: string) {
    let del = confirm("Are you sure to delete this user?");
    if (del) {
      this.userService
        .deleteUser(userId)
        .subscribe(user => {
          this.getUsers();
        })
    }
  }
}

class UserInfo {
  constructor(
    private id: string,
    private email?: string,
    private fullname?: string,
    private address?: string,
    private updatedAt?: string,
    private action?: string
  ) { }
}