import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UserListComponent } from './users/user-list/user-list.component';


const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path : 'new-user', component : NewUserComponent },
  { path : 'edit-user/:id', component : EditUserComponent },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
