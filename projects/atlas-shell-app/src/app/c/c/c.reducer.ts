

import { createAction, createReducer, on, props } from "@ngrx/store"
import { atlasCreateEntityAction } from "atlas-shell-logic"
export const SETUPACTION = createAction("SETUPACTION",props<any>())
export const SETVALUE = createAction("SETVALUE",props<any>())
export const SETNAME = createAction("SETAME",props<any>())
export const GENERAL_ACTION = createAction("GENERAL_ACTION")
export const cReducer = createReducer(
    {name:"AAA",value:123},
    on(SETUPACTION,(state:any,payload:any)=>{
        console.log("CREDUCER",state,payload)
        return {...state,setup:payload.name}}),
    on(SETVALUE,(state,payload)=>{return {...state,value:payload.value}}),
    on(SETNAME,(state,payload)=>{return {...state,name:payload.name}}),
    on(GENERAL_ACTION,(state,action)=>{console.log("GENERAL");return{...state,general:"1"}})
)