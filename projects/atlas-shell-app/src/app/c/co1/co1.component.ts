import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, createAction } from '@ngrx/store';
import { AtlasShellEntityService, ShellActionService } from 'atlas-shell-ui';
import { GENERAL_ACTION } from '../c/c.reducer';
import { ActivatedRoute } from '@angular/router';


@Component({
    standalone:false,
  selector: 'app-co1',
  templateUrl: './co1.component.html',
  styleUrls: ['./co1.component.css'],
  //providers:[AtlasShellEntityService]
})
export class CO1Component implements OnInit,OnDestroy {

  constructor(private shellEntityService:AtlasShellEntityService,
    private store:Store<any>,private activatedRoute:ActivatedRoute,
    private shellActionService:ShellActionService) { 
    console.log("CO1.....")
  }

  ngOnInit(): void {
      //console.log("ENTITY CO1:",this.shellEntityService.entity.id)
  }
  GeneralDispatch()
  {
      this.store.dispatch(GENERAL_ACTION())
  }
  ToB(){
    this.shellEntityService.navigate(["../B"],{relativeTo:this.activatedRoute})
  }
  BackTo(){

  }
  ToCo12(){
      this.shellActionService.NavigateReuse("CO12",this.activatedRoute)
  }
  ToCo13(){
    this.shellActionService.NavigateReuse("CO13",this.activatedRoute)
}


  ngOnDestroy(){
    console.log("DESTROY CO1")
    
  }

}
