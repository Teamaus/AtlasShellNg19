import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AtlasShellEntityService } from 'atlas-shell-ui';

@Component({
    standalone:false,
  selector: 'app-o1',
  templateUrl: './o1.component.html',
  styleUrls: ['./o1.component.css'],
  providers:[AtlasShellEntityService]

})
export class O1Component implements OnInit {

  constructor(private compService:AtlasShellEntityService) {
      

   }
  ngOnInit(): void {
  }

}
