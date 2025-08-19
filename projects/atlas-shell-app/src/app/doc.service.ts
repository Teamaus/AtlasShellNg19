import { Injectable } from '@angular/core';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { SETUPACTION } from './c/c/c.reducer';

@Injectable()
export class DocService {

  constructor(private shellEntity:AtlasShellEntityService) {

   }
   DoSomething(){
    this.shellEntity.dispatch(SETUPACTION({name:"Ruven"}))
   }
}
