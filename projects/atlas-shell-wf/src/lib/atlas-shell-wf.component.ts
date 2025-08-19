import { Component, OnInit } from '@angular/core';
import { WfManagerService } from './wf-manager.service';

@Component({
  standalone:false,
  selector: 'lib-atlas-shell-wf',
  template: `
    <p>
      atlas-shell-wf works!
    </p>
  `,
  styles: [
  ]
})
export class AtlasShellWfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
