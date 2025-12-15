

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavUtilsV19Service {
  
  constructor() { }
  
  

 getFutureUrl(
  route: ActivatedRouteSnapshot,
  op: string,
  outlet: string = ''
): string {
  const currentUrl = this.getURLfromSnapshotWithOutlet(route);

  // Helper: append op to an existing path
  const appendOp = (basePath: string, op: string): string =>
    op ? (basePath ? `${basePath}/${op}` : op) : basePath;

  // Named outlet case: "/(outlet:path)"
  if (currentUrl.startsWith('/(')) {
    const match = currentUrl.match(/^\/\(([^:]+):(.*)\)$/);
    if (!match) {
      // Fallback: if format is unexpected, just append naively
      return currentUrl.endsWith('/') ? currentUrl + op : `${currentUrl}/${op}`;
    }

    const currentOutlet = match[1];
    const currentPath = match[2];

    const targetOutlet =
      outlet && outlet !== 'primary' ? outlet : currentOutlet;

    const newPath = appendOp(currentPath, op);

    return `/(${targetOutlet}:${newPath})`;
  }

  // Primary outlet case: "/path"
  const basePath = currentUrl.startsWith('/') ? currentUrl.slice(1) : currentUrl;
  const newPath = appendOp(basePath, op);

  // If no outlet specified or explicitly primary → stay in primary
  if (!outlet || outlet === 'primary') {
    return '/' + newPath;
  }

  // If a named outlet is requested → wrap in named outlet
  return `/(${outlet}:${newPath})`;
}

  
  getURLfromSnapshotWithOutlet(route: ActivatedRouteSnapshot): string {
  		const chain = route.pathFromRoot;

  		const path = chain
    		.map(r => r.url.map(s => s.path).join('/'))
    		.filter(p => p.length > 0)
    		.join('/');

  		const outletSnap = chain.find(r => r.outlet && r.outlet !== 'primary');
  		if (!outletSnap) {
    		return '/' + path;
  		}

  		return `/(${outletSnap.outlet}:${path})`;
	}
  getEntityUrl(route: ActivatedRouteSnapshot):string{
      if (route.parent == null )
        throw new Error("Paent is null ")
      if (route.parent==route.root){
        return this.getURLfromSnapshotWithOutlet(route)
      }
      return this.getEntityUrl(route.parent)
  }
  navValue(value:any[]):string
  {
      if (value[0].outlets)
      {
          
          const key = Object.keys(value[0].outlets)[0]
          console.log("Here1",key,value[0].outlets[key])
          return "("+key+":"+value[0].outlets[key]+")"
      }
      else
      {
          return value[0]
      }
    }
  

}

