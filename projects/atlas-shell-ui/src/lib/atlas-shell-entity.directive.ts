import { Directive, input, OnInit } from '@angular/core';
import { AtlasShellEntityFactoryService, AtlasShellFactoryService } from 'atlas-shell-logic';

@Directive({
  selector: 'atlas-shell-enity',
  standalone: false
})
export class AtlasShellEntityDirective implements OnInit{
  entityType = input<string>
  constructor(private shellFactory:AtlasShellEntityFactoryService) { }
  ngOnInit(): void {
         
  }


}
