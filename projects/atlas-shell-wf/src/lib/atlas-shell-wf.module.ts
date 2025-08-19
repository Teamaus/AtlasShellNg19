import { NgModule } from '@angular/core';
import { AtlasShellWfComponent } from './atlas-shell-wf.component';
import { WfManagerService } from './wf-manager.service';
import { WfDirective } from './wf.directive';
import { WfStepDirective } from './wf-step.directive';
import { WfIfDirective } from './wf-if.directive';
import { WfRefDirective } from './wf-ref.directive';
import { StoreModule } from '@ngrx/store';
import { WF_REDUCER } from './wf-reducer';
import { WfRootDirective } from './wf-root.directive';
import { ShellEntityModule } from 'atlas-shell-ui';
import { WfDataDirective } from './wf-data.directive';
import { WfForDirective } from './wf-for.directive';
import { WfCurrentDirective } from './wf-current.directive';
import { WfCurrentConditionDirective } from './wf-current-condition.directive';
import { WfIteratorDirective } from './wf-iterator.directive';
import { WfCollectionDirective } from './wf-collection.directive';
import { WfForEachDirective } from './wf-for-each.directive';



@NgModule({
  declarations: [
    AtlasShellWfComponent,
    WfDirective,
    WfStepDirective,
    WfIfDirective,
    WfRefDirective,
    WfRootDirective,
    WfDataDirective,
    WfForDirective,
    WfCurrentDirective,
    WfCurrentConditionDirective,
    WfIteratorDirective,
    WfCollectionDirective,
    WfForEachDirective
  ],
  imports: [
    
    //StoreModule.forFeature("workflow-ref",[WF_REDUCER]),
    ShellEntityModule.feature("workflow",WF_REDUCER)
  ],
  exports: [
    AtlasShellWfComponent,
    WfDirective,
    WfStepDirective,
    WfIfDirective,
    WfRefDirective,
    WfRootDirective,
    WfForDirective,
    WfCurrentDirective,
    WfCurrentConditionDirective

  ],
  providers:[WfManagerService]
})
export class AtlasShellWfModule { }
