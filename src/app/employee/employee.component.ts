import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private fb: FormBuilder,
    private services: EmployeeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  createForm() {
    this.empForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfB: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      education: ['', [Validators.required]],
      company: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      package: ['', [Validators.required]],
    });
  }

  submitForm() {
    if(this.empForm.valid){

      if(this.data){
        this.services.updateEmployees(this.empForm.value, this.data.id).subscribe({
          next: (res:any) => {
            this.dialogRef.close(true)
            this.toastr.success('success updated employee');
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
      else {
        this.services.addEmployee(this.empForm.value).subscribe({
          next: (res) => {
            this.dialogRef.close(true)
            this.toastr.success('success added employee');
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
