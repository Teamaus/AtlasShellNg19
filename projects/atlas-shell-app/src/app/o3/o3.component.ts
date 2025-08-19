import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { AtlasShellEntityService,AtlasShellFormService } from 'atlas-shell-ui';

@Component({
    standalone:false,
  selector: 'app-o3',
  templateUrl: './o3.component.html',
  styleUrls: ['./o3.component.css'],
  providers:[AtlasShellEntityService,AtlasShellFormService]

})
export class O3Component implements OnInit {
  frm!: FormGroup<{ Name: FormControl<string | null> }>;
  constructor(private formService:AtlasShellFormService) { }

  ngOnInit(): void {
   // this.frm = this.formService.createForm("O3",{Name:new FormControl('')})
   this.frm = new FormGroup({Name:new FormControl<string|null>('')})
   
  }

}
