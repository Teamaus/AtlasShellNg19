import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { AtlasShellReuseStrategy } from './atlas-reuse-strategy';

@Injectable({
  providedIn: 'root'
})
export class AtlasShellNavigationV19Service {

  constructor(private router:Router,@Optional() @Inject(RouteReuseStrategy) private routeReuseStrategy:AtlasShellReuseStrategy) { 

  }
  NavEntity(entityID:string,entityType:string,activatedRoute:ActivatedRoute){
      
      if (this.routeReuseStrategy)
      {
          console.log("Nav Entity =>>>")
          this.routeReuseStrategy.setEntityType(entityType)
      }
      console.log("Nav Entity =>>>",entityID,entityType)

      this.navigate([{outlets:{["root_"+entityID]:[entityType]}}],true,entityType,{relativeTo:activatedRoute})
  }
    
  navigate(value:any,save:boolean,entityType:string,extras?:any|undefined){
    let routedValue = value
    console.log("entityIDSelectorSubscribe",value,save,extras)
    
    
    if (this.routeReuseStrategy)
    {
      
      let pathState = ((this.routeReuseStrategy) as any).pathState
      
      this.routeReuseStrategy.setSavedValue(value,save)    
      routedValue = pathState.get(this.routeReuseStrategy.getKey(value))?pathState.get(this.routeReuseStrategy.getKey(value)):value
      if (this.routeReuseStrategy.navMode=="URL")
      {
        console.log("HERE?")
        this.routeReuseStrategy.entityType = entityType
      }

      

    }
 
      
    console.log("ASE>>>",routedValue,value)
    if (routedValue==value)
    {
        console.log("entityIDSelectorSubscribe",routedValue==value)
        this.router.navigate(routedValue,extras)
    }
    else
    {
        this.router.navigateByUrl(routedValue,extras)
    }
        
      
    

  }
  

}
