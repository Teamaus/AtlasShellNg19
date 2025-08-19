import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
    standalone:false,
  selector: 'atlas-add-entity',
  templateUrl: './atlas-add-entity.component.html',
  styleUrls: ['./atlas-add-entity.component.css']
})
export class AtlasAddEntityComponent implements OnInit {
  @Output() add = new EventEmitter<string>()
  frm = new FormGroup({
    ID:new FormControl('')
})
  constructor() { }
  
  ngOnInit(): void {
       
    
  }
  Add(){
      let v = this.frm.get("ID")
      if (v)
        this.add.emit(v.value as string)
  }


}
