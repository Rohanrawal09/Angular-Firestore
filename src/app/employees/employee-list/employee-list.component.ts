import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service :EmployeeService,
    private firestore : AngularFirestore,
    private tosatr  : ToastrService) { }

  list : Employee[];
  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Employee;
      })
    });
  }
  onEditData(emp : Employee){
    this.service.employeeData = Object.assign({},emp);
  }

  onDelete(id : String){
   if(confirm( "Are You Sure Want To Delete This Employee")) {
   this.firestore.doc('employees/'+id).delete();
   this.tosatr.warning('Employee Deleted' ,'Employee Register')
  }
  }
}
