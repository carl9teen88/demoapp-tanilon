import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

import { UserListComponent } from './user-list.component';


describe('UserListComponent', () => {  
  let userServiceSpy: jasmine.SpyObj<UsersService>;
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  const stubUsers = of([
    new User("1", "ct@gmail.com", "Carl Tanilon", "Summerville B4-L11", new Date()),
    new User("2", "ct2@gmail.com", "Carl Tanilon 2", "Summerville B4-L12", new Date()),
    new User("3", "ct3@gmail.com", "Carl Tanilon 3", "Summerville B4-L13", new Date()),
    new User("4", "ct4@gmail.com", "Carl Tanilon 4", "Summerville B4-L14", new Date()),
    new User("5", "ct5@gmail.com", "Carl Tanilon 5", "Summerville B4-L15", new Date())
  ])

  const displayedColumns = ['id', 'email', 'fullname', 'address', 'updatedAt', 'action'];

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('UsersService', ['getUsers']);


    TestBed.configureTestingModule({
      declarations: [ UserListComponent ]
    })
    .compileComponents();

    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
