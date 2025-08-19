import { Subject } from "rxjs"
import { SUBSCRIBERS } from "./atlas-shell-subscriber"

export class AtlasShellPublisher {
	constructor(private subsribers:SUBSCRIBERS){
		
	}
	publish(id_s:string|string[],obj:any){
		if (typeof id_s=="string"){
			return this.publish_one(id_s,obj)
		}
		return id_s.map(id=>this.publish_one(id,obj))

	}
	
	private isTopicExists(id:string,topic:string):boolean{
		let retval = this.subsribers[id]
		return retval?retval[topic]!=undefined:false
	}
	private publish_one(id:string,obj:any)
	{
		if (this.isTopicExists(id,obj.topic))
		{
		
			this.subsribers[id][obj.topic].topic$.next(obj)
		}
	
		
	}
}
