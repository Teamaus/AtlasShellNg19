import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AtlasShellSubscriber, SUBSCRIBERS } from './atlas-shell-subscriber';
import { AtlasShellPublisher } from './atlas-shell-publisher';
import { take } from 'rxjs/operators';
import { ITopic } from './itopic';
import { IShellEntity } from './ishell-entity';

@Injectable({
  providedIn: 'root'
})
export class AtlasShellServiceBusService {
  subscribers:SUBSCRIBERS = {}
  publisher = new AtlasShellPublisher(this.subscribers)
  subscriber= new AtlasShellSubscriber(this.subscribers)

  activeInstaceIDSelector=createSelector(
    createFeatureSelector("shell"),
    (state:any)=>state.activeInstanceID   
  )
  constructor(private store:Store<any>) { 
    let state$ = this.store.select(state=>state)
    state$.subscribe(state=>console.log("SERVICEBUS=>>>",state))


  }
  activeInstanceID$():Observable<any>{
      return this.store.select(this.activeInstaceIDSelector)
  }
  publish_to_active<T extends ITopic,TRet>(obj:T){
    this.activeInstanceID$()
    .pipe(
      take(1)
    )
    .subscribe(id=>{
                    console.log("PUBLISHING TO ",id,obj)
                    this.publish(id,obj)
                    }
    )
    
  }
  private publish<T,TRet>(id_s:string[]|string,obj:T){
    //here we put the id 
      console.log("SERVICEBUS PUBLISHING:",obj)
      this.publisher.publish(id_s,obj)
    


  }
  
  
  topic$<T>(entity:IShellEntity,topic:string):Observable<any>{
    let retval = this.subscriber.topic$(entity.entity.id,topic)
    console.log("TOPIC$",entity)
    return retval


  }
  removeTopic(entity:IShellEntity,topic:string){
    this.subscriber.removeTopic(entity.entity.id,topic)
  }
  
}
