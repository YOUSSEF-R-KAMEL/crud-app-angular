import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from './services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// id
// firstName
// lastName
// email
// dateOfB
// gender
// education
// company
// experience
// package
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-app';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dateOfB',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];

  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private dialog: MatDialog,
    private services: EmployeeService,
    private toastr: ToastrService
  ) {
    this.getAllEmployees();
  }

  openEmp() {
    const dialogRef = this.dialog.open(EmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next: val => {
        if(val){
          this.getAllEmployees()
        }
      }
    })
  }

  getAllEmployees() {
    this.services.getAllEmployees().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        this.toastr.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditForm(data:any){
    const dialogRef = this.dialog.open(EmployeeComponent, {
      data,
    })

    dialogRef.afterClosed().subscribe({
      next: val => {
        if(val){
          this.getAllEmployees()
        }
      }
    })
  }

  deleteEmployee(id:number){
    this.services.deleteEmployees(id).subscribe({
      next: res => {
        this.toastr.error("Deleted one employee")
        this.getAllEmployees()
      },
      error: err => {
        this.toastr.error(err)
      }
    })
  }
}
