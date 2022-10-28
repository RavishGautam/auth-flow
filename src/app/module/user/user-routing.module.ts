import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDasboardComponent } from './user-dasboard/user-dasboard.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component : UserDasboardComponent},
  {path:'login',component:LoginComponent},
  {path:'list',component:ListComponent},
  {path :'register',component:UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
