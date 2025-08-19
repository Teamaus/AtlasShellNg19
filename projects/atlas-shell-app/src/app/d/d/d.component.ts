import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AtlasShellEntityService, AtlasShellFormService } from 'atlas-shell-ui';
import { ADD_EMPLOYEE, REMOVE_EMPLOYEE } from '../d.reducer';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';

@Component({
    standalone:false,
  selector: 'app-d',
  templateUrl: './d.component.html',
  styleUrls: ['./d.component.css'],
  providers:[AtlasShellEntityService,AtlasShellFormService]
})
export class DComponent implements OnInit {
  @Input() form = new FormGroup(
      {
        name:new FormControl(''),
        dept:new FormControl('')
        
      }
  )

  constructor(private entityService :AtlasShellEntityService,private formService:AtlasShellFormService
    ,private store:Store<any>) { }
  employees:any[] = []
  ngOnInit(): void {
      this.form = this.formService.createForm("EMPLOYEE",{
        name:new FormControl(''),
        dept:new FormControl(''),
        id:new FormControl(0,Validators.min(0))
        
      })
      let selector = createSelector(
        createFeatureSelector("DOP"),
        (state:any)=>state.employees
        
      )
      this.store.select(this.entityService.shellEntitySelector(selector))
      .subscribe(employees=>this.employees = employees)
  }
  AddEmployee(){
      this.entityService.dispatch(ADD_EMPLOYEE({name:this.form.get("name")?.value,dept:this.form.get("dept")!.value}))

  }
  RemoveEmployee(){
      this.entityService.dispatch(REMOVE_EMPLOYEE({id:this.form.get("id")!.value}))

  }

}

