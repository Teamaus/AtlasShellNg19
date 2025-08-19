import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AtlasShellEntityService, ShellActionService } from 'atlas-shell-ui';



@Component({
    standalone:false,
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css'],
  providers:[AtlasShellEntityService]
})
export class AComponent implements OnInit {
  demo = {"firstName":"Avraham"}
  constructor(public compService:AtlasShellEntityService,private router:Router,
    private actionService:ShellActionService,
    private activatedRoute:ActivatedRoute) { 
      
      

      

  }
  Nav(path:string){
    this.compService.navigate([path],{relativeTo:this.activatedRoute})
  }
  ngOnInit(): void {
    console.log("A COMPONENT>>>",this.compService.entity)
    this.Nav("O0")
      //this.compService.createOrActivateChildAntity("O2","step")
      //this.compService.createOrActivateChildAntity("O1","step")
      //this.compService.createOrActivateChildAntity("O0","step")
  }

}
