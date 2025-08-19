import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [RouterOutlet,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name="Oh"
  name2="boh"
  show = false
  title = 'atlas-tests';
  @ViewChild('r1') r?:RouterOutlet
  @ViewChild("r2") r2?:RouterOutlet

  constructor(){

  }
  ngOnInit(){

  }
  ngAfterViewInit(){
   
    console.log("===>>>",this.r!.name)
    
  }
  test(){
    console.log("===>>>",this.r!.name)
    this.show=true 
  }

}
