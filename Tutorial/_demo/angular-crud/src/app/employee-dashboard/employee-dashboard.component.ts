import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModel: EmployeeModel = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    salary: '',
  };
  employeeData: any;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModel.firstname = this.formValue.value.firstname;
    this.employeeModel.lastname = this.formValue.value.lastname;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModel).subscribe(
      (res) => {
        console.log(res);
        alert('Employee Added Successdfully');

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('Sometine went wrong');
      }
    );
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe((res) => {
      alert('Delete Successdfully');
      this.getAllEmployee();
    });
  }

  onEditEmployee(row: any) {
    this.employeeModel.id = row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModel.firstname = this.formValue.value.firstname;
    this.employeeModel.lastname = this.formValue.value.lastname;
    this.employeeModel.email = this.formValue.value.email;
    this.employeeModel.mobile = this.formValue.value.mobile;
    this.employeeModel.salary = this.formValue.value.salary;

    this.api
      .updateEmployee(this.employeeModel, this.employeeModel.id)
      .subscribe((res) => {
        alert('Updateed Successfully');

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
