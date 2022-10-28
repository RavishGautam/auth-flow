import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {UserRegistrationComponent} from '../user-registration/user-registration.component';
import {MatDialog} from '@angular/material/dialog';

export interface UserData {
 ID: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Mobile : number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['ID','FirstName', 'LastName', 'Email', 'Mobile','Action'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(UserRegistrationComponent) userUpdate !:UserRegistrationComponent;
  constructor( private apiServiceService : ApiServiceService,
    private router : Router,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.apiServiceService.getUser()
    .subscribe(res=>{
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('res-->',res)
    },err=>{
      alert('somthing went wrong')
    })
  }

  deleteUser(id: number){
    alert('delete--> '+id)
    this.apiServiceService.deleteUser(id)
    .subscribe(res=>{
      alert('User Deleted Successfully..!')
      this.getUser()
    },err=>{
      alert('Somthing Went Wrong..!')
    })
  }

  onEdit(data: any){
     this.dialog.open(EditDialogComponent,{
      width: '40%',
      data: data,
      panelClass: 'dialog-container-custom' 
      
  }).afterClosed().subscribe(val =>{
    //if(val === 'update'){
      this.getUser();
   // }
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
