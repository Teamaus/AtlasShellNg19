import { Component } from '@angular/core';
import { AtlasNavV19Service } from 'atlas-shell-ui';


@Component({
  selector: 'app-a',
  standalone: false,
  templateUrl: './a.component.html',
  styleUrl: './a.component.css',
  providers:[AtlasNavV19Service]
})
export class AComponent {
  constructor(public navService:AtlasNavV19Service)
  {
  
  }
}
