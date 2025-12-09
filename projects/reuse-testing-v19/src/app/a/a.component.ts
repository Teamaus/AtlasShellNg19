import { Component } from '@angular/core';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-a',
  standalone: false,
  templateUrl: './a.component.html',
  styleUrl: './a.component.css',
  providers:[{provide:NavService}]
})
export class AComponent {
  constructor(public navService:NavService)
  {
  
  }
}
