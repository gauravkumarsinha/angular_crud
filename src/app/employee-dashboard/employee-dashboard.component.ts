
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeModel } from './employee-dashboard model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeModelObj : EmployeModel = new EmployeModel();
  employeData !: any;

  constructor(private formbuilder : FormBuilder, 
    private api : ApiService){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullName : [''],
      emailId : [''],
      city : [''],
      salary : ['']
    })
    this.getAllEmploye();
  }

  postEmployeDetails(){
    this.employeModelObj.fullname = this.formValue.value.fullName;
    this.employeModelObj.emailId = this.formValue.value.emailId;
    this.employeModelObj.salary = this.formValue.value.salary;
    this.employeModelObj.city = this.formValue.value.city;

    this.api.postEmploye(this.employeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added suceessfully")
      this.formValue.reset()
      this.getAllEmploye();
    },
    err=>{
      alert("Something went wrong")
    })
  }

  getAllEmploye(){
    this.api.getEmploye()
    .subscribe(res=>{
      this.employeData = res;
    })
  }

  deleteEmploye(row : any){
    this.api.deleteEmploye(row.id)
    .subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmploye();
    },
    err=>{
      alert("Employee not deleted")
    })

  }

  onEdit(row : any){
    this.formValue.controls['fullname'].setValue(row.fullname);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['salary'].setValue(row.salary);
  }

}
