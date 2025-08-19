import { WfForDirective } from "./wf-for.directive";

export abstract class WFForHandler {
	constructor(private wfFor:WfForDirective){
		this.wfFor.handlers.push(this) 
	}
	
}