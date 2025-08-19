import { Component, OnInit } from '@angular/core';

@Component({
    standalone:false,
  selector: 'app-co13',
  templateUrl: './co13.component.html',
  styleUrls: ['./co13.component.css']
})
export class Co13Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    
    console.log("Destroy CO13")
  }



}
