import { Inject, Injectable } from '@angular/core';
import { ATLAS_SHELL_TOKEN, TREE_ADDENTITY, TREE_SETACTIVE } from 'atlas-shell-logic';

@Injectable({
  providedIn: 'root'
})
export class AtlasStoreBaseService {
  get add_e(){ return  TREE_ADDENTITY(this.shellToken)}
  get activate_e(){return  TREE_SETACTIVE(this.shellToken)}
  
    
  constructor(@Inject(ATLAS_SHELL_TOKEN) private shellToken:string,) { }
}
