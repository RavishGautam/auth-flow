import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../../services/api-service.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  public editForm !: FormGroup;
  constructor(private dialog: MatDialog, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log('editData--->', this.editData)
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    })

    if (this.editData) {

      this.editForm.controls['firstName'].setValue(this.editData.firstName);
      this.editForm.controls['lastName'].setValue(this.editData.lastName);
      this.editForm.controls['email'].setValue(this.editData.email);
      this.editForm.controls['mobile'].setValue(this.editData.mobile);
      this.editForm.controls['password'].setValue(this.editData.password);
    }
  }

  onSaveChange() {

    console.log('edit Form Value--->', this.editForm.value)
    console.log('id--->', this.editData.id)

    this.api.updateUser(this.editForm.value, this.editData.id)
      .subscribe(res => {
        alert('data updated ..!')
      },
        err => {
          alert('Somthing went wrong ..!')
        })

    this.dialog.closeAll()

  }


}
