import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularLazyDemo';
 constructor(private apiServiceService:ApiServiceService){}

 ngOnInit(): void {
   this.getUser()
 }
  getUser(){
    this.apiServiceService.getUser()
    .subscribe(res=>{
      console.log('res-->',res)
    },err=>{
      alert('somthing went wrong')
    })
  }
}
