import { Observable, Observer, Subject, Subscriber, Subscription } from "rxjs"
import { ITopic } from "./itopic"
import { takeUntil } from "rxjs/operators"
export type SUBSCRIBERS = {[id:string]:{[topic:string]:{topic$:Subject<ITopic>,until$:Subject<any>}}}
export class AtlasShellSubscriber {
	constructor(private subsribers:SUBSCRIBERS) {
	}
	getTopic$<T extends ITopic>(id:string,topic:string):any{
		let retval = {newTopic:true,"topic$":new Subject<any>(),"until$":new Subject<any>()}
		if (this.subsribers[id])
			if(this.subsribers[id][topic])
				retval = {newTopic:false,"topic$":this.subsribers[id][topic]["topic$"],"until$":this.subsribers[id][topic]["until$"]}
		
			
		
		return retval
	}
	topic$<T>(id:string,topic:string):Observable<T>{
		let retval = this.getTopic$(id,topic)
		if (retval.newTopic){
			//Add topic to collection 
			this.subsribers[id] = {[topic]:retval}
		}
		
		return retval.topic$.pipe(takeUntil(retval.until$))
	}
	removeTopic(id:string,topic:string){
		if (this.subsribers[id][topic])
		{
			this.subsribers[id][topic].until$.next("END")
		
			delete(this.subsribers[id][topic])
		}
	}
		
			

		
}
