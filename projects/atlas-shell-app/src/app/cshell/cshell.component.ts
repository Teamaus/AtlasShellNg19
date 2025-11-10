import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AtlasShellAddEntityComponent, AtlasShellEntityService } from 'atlas-shell-ui';

@Component({
    standalone:false,
  selector: 'app-cshell',
  templateUrl: './cshell.component.html',
  styleUrls: ['./cshell.component.css'],
  providers:[AtlasShellEntityService]
})
export class CShellComponent implements AfterViewInit {

  constructor(private compService:AtlasShellEntityService) {
      this.compService.component = this
   }  

  ngAfterViewInit(): void {
    
    console.log("CSHELL INIT createOrActivateChildRootEntity 6 ",this.compService.instanceID)
    
  }
  ngOnDestroy(){
    console.log("CSHELL DESTROY ",this.compService)
  }

}
