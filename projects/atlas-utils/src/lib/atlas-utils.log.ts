export const LOGGING= []
export const LOG_EVERYTHING = true
let isFunction=(swComponent:any)=>swComponent?swComponent.constructor?true:false:false
export function atlas_log(swComponent:any,...logMessages:any[]){
    
    let location = isFunction(swComponent)?swComponent.constructor.name:swComponent
    let print =()=>console.log("SWCOMP:",location,"Message:",...logMessages)
    let logThisComponent = LOGGING.filter(swName=>swName==swComponent.constructor.name).length>0
    if (LOG_EVERYTHING || logThisComponent ){
        print()
    }
}

