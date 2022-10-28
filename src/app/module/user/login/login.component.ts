import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup , Validators} from '@angular/forms';
import {AppComponent} from '../../../app.component';
import {ApiServiceService} from '../../../services/api-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signInForm !: FormGroup;
 
  constructor(private formBuilder : FormBuilder, 
    private appComponent : AppComponent,
    private api : ApiServiceService,
    private router : Router) { }

  ngOnInit():void {
this.appComponent.getUser();
   this.signInForm = this.formBuilder.group({
    username : ['' , Validators.required],
    password : ['' , Validators.required]
   })
  }

  signIN(){
   
    console.log(this.signInForm.value);
    //this.signInForm.reset()
    this.api.getUser()
    .subscribe(res=>{
      console.log(res)
      const user = res.find((a:any)=>{
        return a.email === this.signInForm.value.username && a.password === this.signInForm.value.password;
      });
      if (user){
        alert('Login Successfull...!');
        this.router.navigate(['user/list'])
      }else{
        alert('Invalid Credential...!')
      }
    },
    err=>{
      alert('somthing went wrong')
    })
  }
}
