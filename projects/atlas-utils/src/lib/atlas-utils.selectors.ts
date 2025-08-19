import { DefaultProjectorFn, MemoizeFn, MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store"


export interface nestedSelectorInfo  {path:string[]}
export interface SelectorInfo{feature?:string,childSelectors:SelectorInfo[]}
export type SelectorWithNestedInfo = MemoizedSelector<unknown,any,DefaultProjectorFn<any>> & nestedSelectorInfo

export const nestedSelector=(...path:string[]):SelectorWithNestedInfo=>{

    const f:any = (selector:any,path:string[])=>{
        if (path.length==0){
            console.log("NESTED SELECTOR",selector)
            return selector
        }   
        let [first,...rest]=path
        console.log("NESTED SELECTOR",path)
        return f(createSelector(selector,(state:any)=>{
            console.log("NESTED SELECTOR STATE",state)
            return state[first]
        }),rest)

    }
    let [first,...rest]  = path
    let retval = f(createFeatureSelector(first),rest)
    retval.path = path 
    return retval

}


  
