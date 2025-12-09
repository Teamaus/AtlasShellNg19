import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers:[{provide:NavService}]
})
export class AppComponent {
  title = 'reuse-testing-v19';
  constructor(public navService:NavService )
  {}
  
}
