import { Injectable } from '@angular/core';
import { Router, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadInitService {
  constructor(private router: Router) {
   
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadEnd) {
        console.log(console.log("LazyLoadInitService>>>>"))
        this.logLoadedModule(event);
      }
    });
  }

  logLoadedModule(event: RouteConfigLoadEnd): void {
    if (event.route.loadChildren)
    {
      const modulePath = event.route.loadChildren.toString();
      console.log(`Lazy-loaded module initialized: ${modulePath}`);
      // Your additional initialization logic here
    }
  }
}
