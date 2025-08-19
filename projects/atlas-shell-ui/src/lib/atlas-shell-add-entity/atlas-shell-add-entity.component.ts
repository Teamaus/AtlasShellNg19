import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AtlasShellEntityFactoryService, AtlasShellSelectorService, entitiesByActiveCategoryPathSelector } from 'atlas-shell-logic';
import { atlas_log } from 'atlas-utils';
import { AtlasShell_createEntityAction } from 'atlas-shell-logic'
import { fromEvent, Observable, of } from 'rxjs';
import {take,map,switchMap, tap} from 'rxjs/operators'

@Component({
    standalone:false,
  selector: 'atlas-shell-add-entity',
  templateUrl: './atlas-shell-add-entity.component.html',
  styleUrls: ['./atlas-shell-add-entity.component.css']
})
export class AtlasShellAddEntityComponent implements OnInit {
  @Input() path$:Observable<any>=of([])
  @Output() addEntity = new EventEmitter<any>()
  @Input() slice:string=''
  @Input() category=''
  set Category(category:any){
    atlas_log(this,"Setting Category",category)
    this.category = category
  }
  set CategoryPath(categoryPath:any){
    atlas_log(this,"Setting Category",categoryPath)
    this.categoryPath = categoryPath
  }
  @Input() categoryPath:string[]=[]
  frm = new FormGroup({
      ID:new FormControl('')
  })
  @ViewChild('Add') addBtn?:ElementRef
  constructor(private store:Store<any>,private shellEntityFactory:AtlasShellEntityFactoryService,
    private atlasShellSelectors:AtlasShellSelectorService) {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
      let ent$ =  this.store.select(entitiesByActiveCategoryPathSelector(this.slice,this.categoryPath))
      ent$.subscribe(ent=>atlas_log(this,"ACTIVE ENTITY$",ent,this.category,this.categoryPath))
      if (this.addBtn){
          fromEvent(this.addBtn.nativeElement,"click")
          .pipe(
            switchMap(evt=>ent$.pipe(take(1))),
            /*if we dont take then every change will fireup activate again*/
            tap(ent=>atlas_log(this,"AddEntity_Entity",ent,"===>>",this.category,this.categoryPath)),
            map(ent=>ent.path?(ent.path.length==0)?[ent.id]:ent.path:ent.path),
              map(path=>path?path:[])
           )
          .subscribe(path=>
            {
              atlas_log(this,"AddEntityPath",path)
              let actions = AtlasShell_createEntityAction(this.slice)
             
              let entity = this.shellEntityFactory.createEntity(this.frm.get("ID")!.value as string,this.category)
              
              this.store.dispatch(actions.ADD_ENTITY({path:path,entity:entity}))
              
              this.addEntity.emit(entity)
            }


          )

      }
  }

}
