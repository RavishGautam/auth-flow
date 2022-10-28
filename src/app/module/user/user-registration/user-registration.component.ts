import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public registrationForm !: FormGroup;
  errMsg : string ='*All fields are mendetory to fill.';
  errP !: boolean

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private apiServiceService: ApiServiceService,
    private router :Router
  ) {}

  ngOnInit() {
    this.errP = false;
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
 

  signUp() {
    this.errP = false;
    //let isUser = this.getUser()
    console.log(this.getUser())
     

    
    if(this.registrationForm.valid){
    this.apiServiceService.postUser(this.registrationForm.value)
    .subscribe(res=>
      {
        console.log(">>> router", this.router)
    
        this.registrationForm.reset();
        this.router.navigate(['user/login'])
        alert('User Resistration Successfull')
        
      },
      err=>{
        alert('Somthing Went Wrong')
      })
  }
else{
   this.errP = true;
}}

  
getUser(){
  this.apiServiceService.getUser()
  .subscribe(res=>{
    // this.dataSource = new MatTableDataSource(res)
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    res.find((a:any)=>{
      return a.email === this.registrationForm.value.email 
    });
  },err=>{
    alert('somthing went wrong')
  })
}

}
