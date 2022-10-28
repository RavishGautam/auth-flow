import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:'',redirectTo:AppComponent,pathMatch:'full'},
  {path:'admin',loadChildren:()=>import('./module/admin/admin.module').then(m =>m.AdminModule)},
 {path:'user',loadChildren:()=>import('./module/user/user.module').then(m=>m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
