import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtlasNavigationEndService {
  private navigationEnd$ = new BehaviorSubject<any>(undefined)
  constructor(private router:Router) { 
      this.router.events.pipe(filter(event=>event instanceof NavigationEnd))
      .subscribe(
        event=>{
          let param = ""
          console.log("Yup we are here 1")
          let s = this.router.routerState.snapshot.root;
             while (s.firstChild) s = s.firstChild;
             
            if (s.paramMap.get("entity")){
              param = s.paramMap.get("entity")!//this.activatedRoute.snapshot.paramMap.get("entity")!
              this.navigationEnd$.next(param)
              console.log("Yup we are here : ",param)
            }
           
        }
      )
      
  }
  get navigationEnd():Observable<any>{
      return this.navigationEnd$.pipe(filter(param=>!!param))
  }
}
