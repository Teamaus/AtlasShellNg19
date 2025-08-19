import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    standalone:false,
  selector: 'app-co12',
  templateUrl: './co12.component.html',
  styleUrls: ['./co12.component.css']
})
export class Co12Component implements OnInit,OnDestroy {

  constructor() { }
  ngOnDestroy(): void {
    
    console.log("Destroy CO12")
  }

  ngOnInit(): void {
  }
  
}
