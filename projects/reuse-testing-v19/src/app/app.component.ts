import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtlasNavV19Service } from 'atlas-shell-ui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'reuse-testing-v19';
  constructor(public navService:AtlasNavV19Service)
  {}
  
}
