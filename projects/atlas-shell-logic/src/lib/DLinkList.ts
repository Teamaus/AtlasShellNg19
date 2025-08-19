export interface DLinkedList{
    value:any,
    next :DLinkedList|undefined,
    prev:DLinkedList|undefined
}



export class DListManager{
    current:DLinkedList | undefined 
    Set(node:DLinkedList){
        if (this.current){
            this.current = {...this.current}
             this.current.next  = node
            node.prev = this.current
            node.next = undefined
            this.current = node
        }
        else{
            this.current = node
        }
        return this.current
    }
    Back(){
        if (this.current){
            if (this.current.prev){
                this.current=this.current.prev
            }
        }
        return this.current
    }
    Forward(){
        if (this.current){
            if (this.current.next){
                this.current = this.current.next 
            }
        }
        return this.current 
    }


}