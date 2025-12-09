import { Inject, Injectable, Optional } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouteReuseStrategy } from '@angular/router';
import { AtlasShellReuseStrategy } from './atlas-reuse-strategy';
import { filter, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AtlasShellNavigationV19Service {

  constructor(private router:Router,@Optional() @Inject(RouteReuseStrategy) private routeReuseStrategy:AtlasShellReuseStrategy) { 
     this.router.events.pipe(filter(event=>event instanceof NavigationEnd))
      .subscribe(
        event=>{
          this.routeReuseStrategy.navMode = "URL"  
           
          const rootSnapshot = this.router.routerState.root.snapshot;
          console.log("AtlasShellNavigationV19Service 1:",event,rootSnapshot,event.url)
          //const path = this.routeReuseStrategy.getPath(rootSnapshot)
          //this.routeReuseStrategy.setSavedValue([path],true)
          //console.log("NAVIGATION END EVENT:",event)
          console.log("AtlasShellNavigationV19Service 2",(this.routeReuseStrategy as any).pathState)
        }
      )
     
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
    
  targetUrl(router:Router,activatedRoute:ActivatedRoute,value:any)
  {
    const tree   = this.router.createUrlTree(value, { relativeTo: activatedRoute });
    const newUrl = this.router.serializeUrl(tree);

    return newUrl

  }
  setSaveRoute(save:boolean){
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd),take(1))
      .subscribe(
        event=>{
          this.routeReuseStrategy.navMode = "URL"  
          //this.routeReuseStrategy.saveRoute(event.url,save) 
          
        }
      )
     
  }
  navigate(value:any,save:boolean,entityType:string,extras?:any|undefined){
    let routedValue = value
    this.setSaveRoute(save) 
    console.log("entityIDSelectorSubscribe",value,save,extras)
    
    
    if (this.routeReuseStrategy)
    {
      
      let pathState = ((this.routeReuseStrategy) as any).pathState
      
      console.log("SETSAVEDVALUE PATHSTATE:",value,pathState)
      
      this.routeReuseStrategy.setSavedValue(this.targetUrl(this.router,extras["relativeTo"],value),save)    

      this.routeReuseStrategy.saveRoute(this.router.url+"/"+value,extras["relativeTo"].snapshot)
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
        console.log("entityIDSelectorSubscribe 3",routedValue==value)
        this.router.navigate(routedValue,extras)
    }
    else
    {
        this.router.navigateByUrl(routedValue,extras)
    }
        
      
    

  }
  

}
