import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {NavUtilsV19Service} from './nav-utils-v19.service'

@Injectable({
  providedIn: 'root'
})
export class PathStateV19Service {
  pathState:{[purl:string]:string} = {}
  constructor(private navUtil:NavUtilsV19Service) { }
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
