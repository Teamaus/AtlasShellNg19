import { Injectable, Type } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AtlasShellRegistryService {
  registryTable:any= {}

  constructor() { }
  registerInstance<T>(instanceID:string,instance:T){
    let registryEntry = this.registryTable[instanceID]?this.registryTable[instanceID]:{}
    this.registryTable = {...this.registryTable,[instanceID]:{...registryEntry,[(instance as any).constructor.name]:instance}}    
  }
  getInstance<T>(instanceID:string,constructor: { new (): T }): T {
     
      let className = constructor.name
      
      return this.registryTable[instanceID][className]

  }


}
