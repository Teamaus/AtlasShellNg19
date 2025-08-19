import { Injectable } from '@angular/core';

import { WfRoot } from './TOKENS';


@Injectable({
  providedIn: 'root'
})
export class WfRegistryService  {
  _wf :{[id:string]:{[wfName:string]:WfRoot}} = {} 
  register(id:string,wfname:string,wfRoot:WfRoot){
    console.log("WF_REGISTRY",this._wf)

    if (!this._wf[id]){
      this._wf[id] = {}
    }
    this._wf[id][wfname] = wfRoot
    console.log("WF_REGISTRY",this._wf)

  }  
  remove(id:string,wfname:string){
    delete this._wf[id][wfname]
  }
  run(id:string,wfname:string){
    console.log("WF_REGISTRY",this._wf)
      this._wf[id][wfname].run()
  }
}
