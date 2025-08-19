import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtlasSignatureComponent } from './atlas-signature/atlas-signature.component';
import { StoreModule } from '@ngrx/store';
import { signatureReducer } from './atlas-signature/Signature.redeucer';
import { ShellReducerAdapter } from 'atlas-shell-logic';
import { ShellEntityModule } from 'atlas-shell-ui';
import { ReactiveFormsModule } from '@angular/forms';



export const SignatureToken = new InjectionToken<string>("SignatureToken")

@NgModule({
  declarations: [
    AtlasSignatureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShellEntityModule.feature("signature",signatureReducer),
    ShellEntityModule.modalFeature("signature",AtlasSignatureComponent)
  ],
  
})
export class AtlasSignatureModule { 
  
}
