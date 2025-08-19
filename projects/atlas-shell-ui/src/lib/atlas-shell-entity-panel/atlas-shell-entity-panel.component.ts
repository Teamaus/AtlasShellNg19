import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { ATLAS_SHELL_ENTITY_ID_TOKEN, AtlasShellComponentService, AtlasShellSelectorService, AtlasShell_createEntityAction, entitiesByActiveCategorySelector, treeEntityAdapter } from 'atlas-shell-logic';
import { atlas_log } from 'atlas-utils';


import { Subject } from 'rxjs';
import { filter, map, skip, takeUntil, tap } from 'rxjs/operators';

@Component({
  standalone:false,
  selector: 'atlas-shell-entity-panel',
  templateUrl: './atlas-shell-entity-panel.component.html',
  styleUrls: ['./atlas-shell-entity-panel.component.css']
})
export class AtlasShellEntityPanelComponent implements OnInit {
  @Input() path:string[]=[]
  @Input() slice =''
  @Input() category=''
  @Input() entitiesCategory = ''
  @Input() entityCategory = ''
  destroy$ = new Subject()
  keys$ :any
  activeID$:any
  entities:string[] = []
  @Output() addEntities:EventEmitter<boolean> = new EventEmitter<boolean>()
  constructor(private store:Store<any>,private activatedRoute:ActivatedRoute
    ,@Inject(ATLAS_SHELL_ENTITY_ID_TOKEN)private entityID:string,private shellSelectorService:AtlasShellSelectorService) {
             
   }
   
   setSelectors(){
    atlas_log(this,"Setting Selectors",this.entityID,"===>>>",this.entityCategory,"====>>>",this.activatedRoute.snapshot.data)
    if (this.entityCategory==""){
      
      this.entityCategory = this.activatedRoute.snapshot.data[0].rootCategory
     
    }
   }
   /*
  setSelectors(){
    
    atlas_log(this,"PANEL SLICE IS:",this.slice)
    let selector = createSelector(
      createFeatureSelector(this.slice),
      entitiesByActiveCategorySelector(this.slice,this.parentCategory),
      (state:any,entity:any)=>
      {
        atlas_log(this,"PANEL CATEGORY",this.category)
        atlas_log(this,"PANEL",entity)
        this.path = entity.path
        //return (entity.path)?treeEntityAdapter.getEntities(state,entity.path,this.category):undefined
        return (entity.path)?entity.entities:undefined
      }
      
    
    )
    let selector2  = createSelector(
      
      entitiesByActiveCategorySelector(this.slice,this.category),
      (activeID:any)=>activeID.path
    )
   let selector3 = entitiesByActiveCategorySelector(this.slice,this.parentCategory)
   this.store.select(selector2).subscribe(path=>this.path=path)
    
    this.keys$ = this.store.select(selector)
    .pipe(map(entities=>Object.keys(entities?entities:{})))
    this.keys$.subscribe((a:any)=>atlas_log(this,"AAA=>>>",a))
    //this.keys$.pipe(take(1))
   
    let one$ = this.store.select(selector3).pipe(skip(1))
    
   let obs$ = this.keys$.pipe(
    tap(p=>p),
    takeUntil(one$)
   )
    obs$.subscribe(
        (a:any)=>
        {
   
          
          if (a.length==0)
            this.addEntities.emit(true)
        },
        ()=>console.log("ERR"),
        ()=>console.log("STOP$ COMPLETED")
        

    )
    
  }*/
  set EntityCategory(category:any){
    this.entityCategory = category
    this.setSelectors()
  }
  ngOnInit(): void {
    
    this.setSelectors(); 
     
    
    



    
  }
  activate(id:string){
    atlas_log(this,"Activating ...",id,this.category,this.path,this.category)
    this.store.dispatch(AtlasShell_createEntityAction(this.slice).ACTIVATE_ENTITY({path:this.path,entity:{id:id,category:this.category}}))
  }
  ngOnDestroy(){
      atlas_log(this,"DESTROYING")
      this.destroy$.next("")
      
  }  
  

}
