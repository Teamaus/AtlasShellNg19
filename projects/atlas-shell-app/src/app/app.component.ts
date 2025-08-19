import { Component } from '@angular/core';
import {Location  } from '@angular/common'
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Store, createFeatureSelector, createSelector, props } from '@ngrx/store';
import { AtlasShellEntityFactoryService, AtlasShellSelectorService, AtlasShellServiceBusService, AtlasShell_createEntityAction, TREE_ADDENTITY, TREE_SETACTIVE, createCompositeAction } from 'atlas-shell-logic';
import { atlas_log } from 'atlas-utils';
import { filter, map, take } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { RootComponentService } from './root-component.service';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { LazyLoadInitService } from './lazy-load-init.service';



@Component({
    standalone:false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
// providers:[{provide:AtlasShellEntityService}]
})
export class AppComponent {
  title = 'AtlasShellAppV19-1=>>>3';
  entities:any[] = []
  entities$?:Observable<any>
  activeID$?:Observable<any>
  root$?:Observable<any>
  
  constructor(private store:Store<any>,
    private entityService:AtlasShellEntityService,
    private rootService:RootComponentService,private router:Router,private shellServiceBus:AtlasShellServiceBusService
    ,private location:Location
  ,private lazyLoadInitService:LazyLoadInitService){
    console.log("COMP=>>>",this.entityService)
    this.store.select(state=>state)
    .subscribe(state=>{console.log("STATE APP=>",state)})
    this.router.events.pipe(
      filter(event=>event  instanceof NavigationStart)
    )
    .subscribe(
        event=>console.log("CComponent Navigating To =>>>",this.router.url)
    )
    this.shellServiceBus.activeInstanceID$()
    .subscribe(id=>console.log("SERVICEBUS ACTIVE ID",id))
    
      

    
    
    
    
    /*this.compService.createRootEntity("456")
    this.compService.createOrActivateChildRootEntity("B")

    this.compService.createRootEntity("123")
    this.compService.createOrActivateChildRootEntity("C")
    this.compService.createOrActivateChildRootEntity("A")*/
    

    
    this.entities$ = this.rootService.rootEntities$().pipe(map(entities=>entities.map((ent:any)=>{return {...ent,visibility:"hidden"}})))
    this.entities$.subscribe(entities=>this.buildEntities(entities))
    this.activeID$=this.rootService.activeRootEntity$()
    
    
    this.activeID$.pipe(map(entity=>atob(entity))).subscribe(entity=>console.log("ACTIVE ENTITY$$===>>",entity))
    this.root$ = this.rootService.root$().pipe(map(root=>JSON.stringify(root)))
  }
  buildEntities(entities:any[]){
    for (let e1 of entities){
      let index = this.entities?.findIndex(e2=>e1.id==e2.id)
      if (index == -1){
          this.entities.push(e1)
      }
    }
  }
  trackByIndex(index:number,item:any){
      console.log("TAKE TRACK BY:",item)
      return index
  }

}
