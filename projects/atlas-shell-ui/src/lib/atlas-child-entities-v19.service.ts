import { Injectable } from '@angular/core';

@Injectable()
export class AtlasChildEntitiesV19Service {
  childEntities:any[] = []
  constructor() { }
  addEntity(entity:any){
      this.childEntities=[...this.childEntities,entity]
  }
  searchEntity(type:string):any{
    return this.childEntities.find(entity=>entity.type==type)
  }
}
