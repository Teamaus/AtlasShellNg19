import { Component, OnInit } from '@angular/core';

@Component({
    standalone:false,
  selector: 'lib-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
