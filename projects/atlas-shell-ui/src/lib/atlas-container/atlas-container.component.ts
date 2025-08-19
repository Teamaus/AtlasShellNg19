import { Component, ContentChildren, Inject, Input, OnInit, QueryList } from '@angular/core';
import { AtlasContainerService } from '../atlas-container.service';
import { filter, map, tap } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { atlas_log } from 'atlas-utils';
import { ATLAS_SHELL_TOKEN, AtlasShellRootEntityService, AtlasShellSnapshotService, entityTreeActiveIDLevelSelector, urlLevel } from 'atlas-shell-logic';
import { Store } from '@ngrx/store';


@Component({
    standalone:false,
  selector: 'atlas-shell-container',
  templateUrl: './atlas-container.component.html',
  styleUrls: ['./atlas-container.component.css'],
  providers:[AtlasContainerService]
})
export class AtlasContainerComponent implements OnInit {

  @ContentChildren(RouterOutlet) outlets!:QueryList<RouterOutlet>
  @Input() selectors:any = {}
  @Input() name = ""
  constructor(private containerService:AtlasContainerService,@Inject(ATLAS_SHELL_TOKEN)private shellToken:string,private store:Store<any>,
  private rootService:AtlasShellRootEntityService) {
    
  
   }

  ngOnInit(): void {
  }
  
  ngAfterContentInit(){


    let selectors:any = this.outlets.reduce((acc,outlet)=>{return {...acc,[(outlet as any).name]:entityTreeActiveIDLevelSelector(this.shellToken,urlLevel(this.containerService.URL)+1,(outlet as any).name)}},{})
    
    for (let outlet of this.outlets){
      let selector = selectors[(outlet as any).name]
      this.store.select(selector)
      .pipe(
    
          map(path=>[(outlet as any).name,path]),
          map(([name,path]:any)=>{return (!path||!path[name])?[name,{[name]:"EMPTY"}]:[name,path]}),
    
          filter((([name,path])=>this.containerService.currentPath[name]!=path[name])),
          tap(obj=>atlas_log(this,"SELECTORS NAV After",obj)),
          map(([name,path]:any)=>path)
          )
      .subscribe(
        (path:any)=>
        {
          //We will move this to the effect set active 
          
          //  this.mostSnapshotService.saveSnapshot()
            //********
            console.log("SELECTORS NAV",path)
           
           // this.containerService.NavTo2(path)
        
        })
    
    }
  }
    
 
  
}
