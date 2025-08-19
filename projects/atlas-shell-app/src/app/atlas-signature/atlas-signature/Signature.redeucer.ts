import { createAction, createReducer, on, props } from "@ngrx/store";
export const signAction = createAction("Sign",props<any>())
export const signatureReducer = createReducer(
    {},
    on(signAction,(state,payload)=>{return {...state,sign:payload.sign}})

    
)