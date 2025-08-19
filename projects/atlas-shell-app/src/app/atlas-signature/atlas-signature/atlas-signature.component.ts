import { Component, OnInit } from '@angular/core';
import { AtlasShellEntityService } from 'atlas-shell-ui';
import { signAction } from './Signature.redeucer';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    standalone:false,
  selector: 'app-atlas-signature',
  templateUrl: './atlas-signature.component.html',
  styleUrls: ['./atlas-signature.component.css']
})
export class AtlasSignatureComponent implements OnInit {
  frm = new FormGroup({
    signature:new FormControl('')
  })
  constructor(private entityService:AtlasShellEntityService) { }

  ngOnInit(): void {
  }
  sign(){
      let signature = this.frm.get("signature")!.value
      this.entityService.dispatch(signAction({sign:signature}))

  }

}
