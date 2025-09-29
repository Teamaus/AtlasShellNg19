import { Component } from '@angular/core';

import { Store } from '@ngrx/store';


@Component({
  
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'atlas-shell-app-v2';
  constructor(private store:Store){

  }
  ngOnInit(){
      const selector = this.store.select(state=>state)
      selector.subscribe(data=>console.log("DATA",data))
  }
}
