import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  addEmployee(data:any){
    return this.http.post('http://localhost:3000/employee', data)
  }

  getAllEmployees(){
    return this.http.get('http://localhost:3000/employee')
  }

  updateEmployees(data:any, id:number){
    return this.http.put(`http://localhost:3000/employee/${id}`, data )
  }

  deleteEmployees(id:number){
    return this.http.delete(`http://localhost:3000/employee/${id}`)
  }
}
