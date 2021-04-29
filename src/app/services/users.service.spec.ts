import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  const stubUsers = of([
    new User("1", "ct@gmail.com", "Carl Tanilon", "Summerville B4-L11", new Date()),
    new User("2", "ct2@gmail.com", "Carl Tanilon 2", "Summerville B4-L12", new Date()),
    new User("3", "ct3@gmail.com", "Carl Tanilon 3", "Summerville B4-L13", new Date()),
    new User("4", "ct4@gmail.com", "Carl Tanilon 4", "Summerville B4-L14", new Date()),
    new User("5", "ct5@gmail.com", "Carl Tanilon 5", "Summerville B4-L15", new Date())
  ])
  const stubUser = of(new User("1", "ct@gmail.com", "Carl Tanilon", "Summerville B4-L12", new Date()));

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UsersService', ['getUser', 'getUsers', 'addUser', 'updateUser']);

    TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    });

    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
  });

  it('#getUser should return stubbed user from a spy', () => {
    userServiceSpy.getUser.and.returnValue(stubUser);
    userServiceSpy.getUser(null).subscribe(user => {
      expect(user).toBeTruthy();
    });    
  });

  it('#getUsers should return (5) total users count', () => {
    userServiceSpy.getUsers.and.returnValue(stubUsers);  
    userServiceSpy.getUsers().subscribe(users => {
      expect(users.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('#addUser should return Id and UpdatedAt', () => {    
    let userStub = new User(null, "ct6@gmail.com", "Carl Tanilon 6", "Summerville B4-L16", null);
    userServiceSpy.addUser.and.returnValue(of(userStub));  
    userStub._id = "6";
    userStub.updated_at = new Date();
    userServiceSpy.addUser(userStub).subscribe(u => {
      expect(u._id).toBe("6");
      expect(u.updated_at).toBeTruthy();
    });
  }); 
  
  it('#updateUser should user info correctly', () => {    
    let userStub = new User("6", "ct6@gmail.com", "Carl Tanilon 6", "Summerville B4-L16", new Date());

    userServiceSpy.updateUser.and.returnValue(of(userStub)); 
    userServiceSpy.updateUser(userStub).subscribe(u => {
      expect(u._id).toBe("6");
      expect(u.usr_email).toBe("ct6@gmail.com");
      expect(u.usr_fullname).toBe("Carl Tanilon 6");
      expect(u.usr_address).toBe("Summerville B4-L16");
    });
  });
});
