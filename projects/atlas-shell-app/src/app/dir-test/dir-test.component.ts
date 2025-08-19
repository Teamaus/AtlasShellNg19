import { Component, OnInit,Injector, ContentChildren, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { BaseDirective, MyTestDirective } from '../my-test.directive';

@Component({
    standalone:false,
  selector: 'dir-test',
  templateUrl: './dir-test.component.html',
  styleUrls: ['./dir-test.component.css']
})
export class DirTestComponent implements OnInit {
  directives:any[] = [] 
  constructor(private injector:Injector){}
  ngOnInit() {
    // Get all directive instances dynamically
    const directives = this.getDirectives();
    
    // Output detected directives
    console.log('Detected directives:', directives);
    console.log("DIRECTIVES",this.directives)
  }
  ngAfterViewInit(){
   
    
  }
  private getDirectives(): any[] {
    return []
  } 
    
  

}
