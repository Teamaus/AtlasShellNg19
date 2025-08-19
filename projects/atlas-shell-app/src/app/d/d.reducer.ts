import { createAction, createReducer, on, props } from "@ngrx/store"

export const ADD_EMPLOYEE = createAction("ADD_EMPLOYEE",props<any>())
export const REMOVE_EMPLOYEE = createAction("REMOVE_EMPLOYEE",props<any>())
function addEmployee(employees:any[],id:number,emp:any):any{
    return {employees:[...employees,{...emp,id:id}],id:++id}
}
function removeEmployee(employees:Array<any>,id:number){
       return employees.filter(emp=>emp.id!=id)
}
export const DReducer = createReducer(

    {employees:[],id:0},
    on(ADD_EMPLOYEE,(state:any,emp)=>{return addEmployee(state.employees,state.id,emp)}),
    on(REMOVE_EMPLOYEE,(state:any,emp)=>{return {...state,employees:removeEmployee(state.employees,emp.id)}})

    

)