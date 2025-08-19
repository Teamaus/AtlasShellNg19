import { Component, Input } from '@angular/core';

@Component({
  selector: 'atlas-router-outlet-adapter',
  standalone: false,
  templateUrl: './router-outlet-adapter.component.html',
  styleUrl: './router-outlet-adapter.component.css'
})
export class RouterOutletAdapterComponent {
  @Input() name="primary"
}
