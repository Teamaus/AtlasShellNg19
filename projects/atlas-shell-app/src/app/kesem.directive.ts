import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Directive({
    standalone:false,
  selector: 'router-outlet'
})
export class KesemDirective {
  @Input() name="primary"
  constructor(private viewContainerRef: ViewContainerRef,private routerOutlet:RouterOutlet,private router:Router,private activeRoute:ActivatedRoute) {
    // You can now access the view container
    // and perform operations related to dynamic component loading
    
  }
  ngOnInit(){
    console.log("NAME=>>>",this.name)
    this.router.events.
    pipe(filter(event=>event instanceof NavigationEnd),
      filter(event=>this.activeRoute.outlet==this.name))
    .subscribe(
      event=>console.log("URL=>>>",this.router.url)
    )
  }
  ngAfterViewInit(){
    
    
  }

}
