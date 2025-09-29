import { AfterViewInit, Component, Inject, Injectable, Injector, OnInit, Type } from '@angular/core';
import { SETNAME, SETUPACTION, SETVALUE } from './c.reducer';
import { Store, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { AtlasProvideRegistryService, AtlasShellEntityService, AtlasShellModalModuleModule, AtlasShellSelect, ShellActionService, WfRegistryService } from 'atlas-shell-ui';
import { nestedSelector } from 'atlas-utils';
import { EFFECT_ACTION } from '../c.actions';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { AtlasShellRegistryService, AtlasShellServiceBusService, RAISE_EVENT } from 'atlas-shell-logic';
import { SignatureToken } from '../../atlas-signature/atlas-signature.module';
import { EffectService } from '../../effect.service';
import { CService } from '../../c.service';
import { DocService } from '../../doc.service';
import { filter, switchMap } from 'rxjs/operators';
import { IHandler, IWfCustomRunner, WfCurrentDirective, WfForDirective, WfManagerService } from 'atlas-shell-wf';



//import { AtlasProvideRegistryService } from 'projects/atlas-shell-ui/src/lib/atlas-shell-provide-registry-service';

let A3 = createAction("A3")
let selectorA = createSelector(
  createFeatureSelector("COP"),
  
    (state:any)=>{console.log("NESTED",state);return state.cData.name}
)
let selectorB = createSelector(
    
  createFeatureSelector("COP"),
    (state:any)=>state.cData.value
)
type StoreConstructor = new <T>() => Store<T>;

function demo(...deps:Type<any>[]){

}
@Component({
  standalone:false,
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css'],
  providers:[EffectService,AtlasProvideRegistryService(CService,DocService),AtlasShellEntityService,WfManagerService]
  
})
export class CComponent implements AfterViewInit {
  static count = 0 
  close = false
  compCounter = 0 
  constructor(private compService:AtlasShellEntityService,private store:Store<any>,
    private activeRout:ActivatedRoute,
    private router:Router,
    private serviceBus:AtlasShellServiceBusService,
    private cService:CService,
  private wfRegistry:WfRegistryService,
  private shellActionService:ShellActionService,
private injector:Injector) { 
   this.compCounter = ++CComponent.count
   console.log("COP CTOR",this.compCounter)   
   this.store.dispatch(A3())
   this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.close = false
      });
   
   demo(CService,Store)
  }
  logEntity(){
    console.log("Log Entity:",this.compService.entity)
  }
  ngAfterViewInit(): void {
   
    console.log("C INIT",this.compService)
    console.log("ENTITY:",this.compService.entity)
    //this.cService.DoIt()
   // let obs$ = this.serviceBus.topic$(this.compService,"Error")
    //obs$.subscribe((obj)=>console.log("SERVICEBUS GOTIT=>>>",obj))
    //console.log("C INIT",obs$)
    let selector2 = this.compService.shellEntitySelector(selectorA,"cData")
    let selector3 = this.compService.shellEntitySelector(selectorB,"cData")
    /*this.store.select(selectorA)
    .subscribe(state=>console.log("STATE APP A",state))*/
    //AtlasShellSelect(this.compService,this.store.select(selector2))
    /*this.compService.shellEntitySelect(selectorA,"cData")
    .pipe(filter(v=>this.compService.entity))
    .subscribe(v=>console.log("ENTITY$2==>>",v))
    this.store.select(selector3)
    .subscribe(v=>
    {
      console.log("CComponent ENTITY C:",this.compService.entity.id,this.compCounter,this.compService.entity.category)
      console.log("STATE APP VB(Value)=>>",v)
    })
    console.log("CComponent createOrActivateChildRootEntity 6 ",this.compService.instanceID)
    console.log("MODALS",AtlasShellModalModuleModule.modals)
    this.compService.entity$().subscribe(e=>console.log("ENTITY$3",e))*/
  }
  toggleClose(){
    this.close = !this.close
    
  }
  NavClose(op:string,navop:string){
    //this.compService.closeAndNavigate([op],{relativeTo:this.activeRout})
    
    //this.shellActionService.NavigateReuse(op,this.activeRout,true)
    this.compService.closeRoute(op)
    //this.shellActionService.NavigationClose(op,this.activeRout)
    
    //this.shellActionService.NavigateReuse(navop,this.activeRout)


  }

  Nav(op:string){
    
    this.compService.navigateSave([op],{relativeTo:this.activeRout})
   console.log("SASID:",op,this.activeRout,"===>>",this.shellActionService.currentAction,this.shellActionService.sasid)

   //this.shellActionService.NavigateReuse(op,this.activeRout)
    
  }
  VALUE(op:string){
    this.compService.dispatch(SETVALUE({value:Math.floor(Math.random()*10)}))
    this.store.dispatch(RAISE_EVENT("shell")({id:this.compService.entity.id,event:"SETVALUE",value:"Random"}))    
  }
  NAME(op:string){
    let arr = ["A","B","X","Y","Z","TT","V"]
    let v = Math.floor(Math.random()*7)
    let n = arr[v]
    console.log("N&V",n,v )
    this.compService.dispatch(SETNAME({name:n}))
  }
  ngOnDestroy()	{
    console.log("CComponent DESTROYING ",this.compService.entity.id,this.compCounter,this.compService.entity.category)
    
  }
  removeTopic(){
    this.serviceBus.removeTopic(this.compService,"Error")
  }
  RunWF(){
    this.compService.dispatch(EFFECT_ACTION())
    //  this.wfRegistry.run(this.compService.entity.id,"abcd")
  }
  getHandlers():Array<IWfCustomRunner>{
    const handler1 = this.injector.get<Handler1>(Handler1)
    return [handler1]
  }
  
}
abstract class HandlerBase implements IHandler {
    setIterator(wfCurrent: any): void {
      throw new Error('Method not implemented.');
    }
    run(): void {
      throw new Error('Method not implemented.');
    }
    wfCurrent?:WfCurrentDirective
    abstract getResult():any
    
}
class Handler1 extends HandlerBase implements IWfCustomRunner{
  override run(): void {
    console.log("HANDLER 1")
    
  }
  getResult(){
    return {A:123}
  }
}

class Handler2 extends HandlerBase implements IWfCustomRunner{
  getResult() {
    return {B:123}
  }
  
  override run(): void {
    console.log("HANDLER 1")
  }
  
}
