import { Injectable, Injector } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AtlasShellModalModuleModule } from './atlas-shell-modal-module/atlas-shell-modal-module.module';

export function registerModal(modalToken:string,component:any){
    return (modalEntityService:AtlasShellModalEntityService)=>{
  
    modalEntityService.componentRegistry = {...modalEntityService.componentRegistry,[modalToken]:component}
    return modalToken 
    }
}



@Injectable({
  providedIn: 'root'
})
export class AtlasShellModalEntityService {
  componentRegistry :{[key:string]:any} = {}
  componentRefs:{[modalName:string]:any} = {}
  openModal(id:string,category:string,content:any,injector:Injector |undefined){
     
    let c = injector?this.modalService.open(content,{injector:injector}):this.modalService.open(content)
    let obj = {[category]:c,visible:true}
    
    this.componentRefs = {...this.componentRefs,[id]:{...this.componentRefs[id],obj}}
    return c 
  }
  constructor(private modalService:NgbModal) {

  }

  showModal(id:string,category:string){
      
  }
  closeModal(id:string,category:string){
      this.componentRefs[id][category].close()
      let c :NgbModalRef=  this.componentRefs[id][category]
      

  }
  navigateModal(id:string,category:string,modalToken:string,injector:Injector|undefined=undefined)
  {
      
      this.openModal(id,category,AtlasShellModalModuleModule.modals[modalToken],injector)
  }



  
   
   
}
