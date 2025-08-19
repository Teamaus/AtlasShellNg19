import { Component, OnInit } from '@angular/core';

@Component({
    standalone:false,
  selector: 'lib-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
