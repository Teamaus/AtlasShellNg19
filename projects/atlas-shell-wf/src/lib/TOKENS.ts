import { forwardRef, InjectionToken, Type } from "@angular/core";

import { Observable } from "rxjs";
import { WfManagerService } from "./wf-manager.service";

export interface IWfRunnable{
	setRunner(runner:IWfCustomRunner):void 
}
export interface IWfStep{
	getResult$<T>():Observable<T>
	setResult<T>(result:T):void
	getParams():any[]
	getParam(name:string):any
	getParam$(name:string):Observable<any>
	execute():void 
	onExecute$:Observable<any>
	



}
export interface WfRoot{
	getWfManager():WfManagerService
	run():void 
	getWfName():string
}
export interface IWfConditionalHandler extends IWfCustomRunner{
	conditionalHandler:IWfCustomRunner
}
export interface IWfCustomRunner{
	run():void
}
export const PARENT_TOKEN = new InjectionToken<IWfStep>("PARENT_TOKEN")
export const WF_STEP = new InjectionToken<IWfStep>("WF_STEP")
export const WF_ROOT = new InjectionToken<WfRoot>("") 
export function setParentToken<T>(element:Type<T>){
	return [{provide:PARENT_TOKEN,useExisting:forwardRef(()=>element)},
			{provide:WF_STEP,useExisting:forwardRef(()=>element)}]

}

export interface IIterator{
	current():any
	next():any
	first():any
	prev():any
	last():any
	end():boolean
}
export interface IIteratorService{
	add(key:string,iterator:IIterator):IIterator
	get(key:string):IIterator
	delete(key:string):void

}
export const WF_ITERATOR_SERVICE = new InjectionToken<IIteratorService>("WF_ITERATOR_SERVICE")
export const WF_ITERATOR = new InjectionToken<IIterator>("WF_ITERATOR")
export interface IHandler extends IWfCustomRunner
{
	setIterator(wfCurrent:any):void
	getResult():any 

}