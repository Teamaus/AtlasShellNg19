import { createAction, createReducer, on, props } from "@ngrx/store";
class WfAdapter {
	createWorkFlow(state:any,payload:any){
		console.log("CREATE WORK FLOW",state,"PAYLOAD:",payload,"STATE:",state)
		let retval = {...state}
		
		console.log("CREATE WORK FLOW RET",retval)
		return {...retval,[payload.workflow]:{}} 
	}
	setRef(state:any,payload:any){
		let retval = {...state}
		return {...retval,[payload.wf]:{[payload.refName]:payload.value}} 
	}
}
export const CREATE_WF = createAction("CREATE_WF",props<any>())
export const SET_REF = createAction("SET_REF",props<any>())
const wfAdapter = new WfAdapter() 
export const WF_REDUCER = createReducer(
	{},
	on(CREATE_WF,(state,payload)=>wfAdapter.createWorkFlow(state,payload)),
	on(SET_REF,(state,payload)=>wfAdapter.setRef(state,payload))
	
)