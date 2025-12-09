import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NavUtilService } from './nav-util.service';

@Injectable({
  providedIn: 'root'
})
export class PathStateService {
  pathState:{[purl:string]:string} = {}
  constructor(private navUtil:NavUtilService) { }
  setPathState(pSnapshot:ActivatedRouteSnapshot,url:string){
      if (pSnapshot == pSnapshot.root)
      {
          return 
      }
      if (pSnapshot.parent==null)
      {
        throw new Error("snapshot parent is null :"+url)
      }
      
      
      const pUrl = this.navUtil.getURLfromSnapshotWithOutlet(pSnapshot)
      console.log("SET PATH STATE:",pUrl,url)
      this.pathState[pUrl] = url
      
      this.setPathState(pSnapshot.parent,url)
      
  }
  getPathState(snapshot:ActivatedRouteSnapshot,navValue:string){
    const url = this.navUtil.getURLfromSnapshotWithOutlet(snapshot)+navValue
    console.log("getPathState:",url,this.pathState)
    return this.pathState[url] 
  }
  
}
