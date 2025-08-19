import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';



import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AtlasShellEntityService, AtlasShellFormService} from 'atlas-shell-ui';

@Component({
  standalone:false,
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css'],
  providers:[AtlasShellEntityService,AtlasShellFormService]
  
})
export class BComponent implements OnInit {
  frm = new FormGroup({
    ID:new FormControl('')
  })
  sleep(){
    console.log("STORE SLEEP")
  }
  constructor(private compService:AtlasShellEntityService,private formService:AtlasShellFormService,
    private activatedRoute:ActivatedRoute
  ) {
      
      console.log("BComponent...")
   }

  ngOnInit(): void {
    console.log("B COMPONENT>>> INIT>>> CTOR",this.compService.entity)
   // this.frm = this.formService.createForm("BPersonalDetails",{ID:new FormControl('')})
   this.frm = new FormGroup({ID:new FormControl('')})
  }
  ngOnDestroy(){
      

 
  }
  Nav(op:string){
  console.log("FORM=>>>>",this.frm.value)
   //this.compService.createOrActivateChildAntity(op,"info")
   //[{outlets:{[entity.category]:[entity.type,param]}}],{relativeTo:this.activatedRoute}
   this.compService.navigate([{outlets:{info:["O3"]}}],{relativeTo:this.activatedRoute})
  }
 


}

