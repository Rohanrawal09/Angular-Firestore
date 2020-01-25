import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service : EmployeeService,
    private firestore : AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetData();
  }

  resetData(form? : NgForm){
    if(form!=null)
    form.resetForm();
    this.service.employeeData ={
    id : null,
    firstName : '',    
    lastName : '',
    empCode : '',
    designation : '',
    mobileNumber : '',
   }
  }

  onSubmitEvent(form : NgForm){
    let data =Object.assign({}, form.value);
    delete data.id;
    if(form.value.id == null)
    this.firestore.collection('employees').add(data);
    else
    this.firestore.doc('employees/'+form.value.id).update(data)
    this.resetData(form);
    this.toastr.success('Registered', 'Employee Data');
  }
}
