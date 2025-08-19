import { ChangeDetectorRef, ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { AtlasShellRootEntityService } from 'atlas-shell-logic';


@Directive({
    standalone:false,
  selector: 'old-atlas-router-outlet-adapter',
  providers:[AtlasShellRootEntityService]
  
})
export class AtlasRouterOutletAdapterDirective {

  _name:string = ""
  @Input() set name(value:string){
    if (this._name!="" && this._name!=value){  
        console.log("Detach")  
        this.detach()
        this.attach(value)
    }
    
    this._name=value
    
    
  }
  get name(){
    return this._name
  }
  private outlet!:RouterOutlet
  private inputElem?:HTMLInputElement
  constructor( private parentContexts: ChildrenOutletContexts,
    private location: ViewContainerRef,
    private resolver: ComponentFactoryResolver, 
    private changeDetector: ChangeDetectorRef,
    private rootEntityService:AtlasShellRootEntityService) { }
    attach(name:string){
     
      
      
      console.log("OUTLET>>>>",this.outlet)
      this.outlet.ngOnInit();
      this.rootEntityService.category = name
     
    }
    detach(){
     
      this.outlet.detach()
      this.outlet.ngOnDestroy()
    }
    ngOnInit() {
      this.attach(this.name)
    }
    ngOnDestroy() {
      if(this.outlet)
      {
     
        this.detach()
      }
    }



}
