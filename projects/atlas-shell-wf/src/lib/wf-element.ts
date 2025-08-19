import { Directive, ElementRef, Inject, Input, Optional, SkipSelf } from "@angular/core";
import { IWfStep, PARENT_TOKEN, setParentToken, WF_ROOT, WfRoot } from "./TOKENS";
import { Observable, of, Subject } from "rxjs";
import { WfManagerService } from "./wf-manager.service";
import { AtlasShellEntityService } from "atlas-shell-ui";
import { take } from "rxjs/operators";
@Directive({
	selector: 'wf-element',
  })
export abstract  class WfElement implements IWfStep{
	@Input() params:any[] = [] 
	abstract getResult$<T>(): Observable<T> 
	abstract setResult<T>(result: T): void 
	abstract execute(): void 
	constructor(@Optional() @SkipSelf() @Inject(WF_ROOT)protected root:WfRoot,@Optional() @SkipSelf() @Inject(PARENT_TOKEN)protected parent:IWfStep,protected el:ElementRef,protected wfManager:WfManagerService) {
		
		this.wfManager.register(el,this)
	 }
	onExecute$: Observable<any> = new Subject<any>()
	getParams(): any[] {
		return this.params
	}
	getParam(name:string){
		return this.wfManager._ref[name]
	}
	getParam$(name:string):Observable<any>{
		return this.wfManager.getRef$(name,this.root.getWfName())
		
	}
	
}
