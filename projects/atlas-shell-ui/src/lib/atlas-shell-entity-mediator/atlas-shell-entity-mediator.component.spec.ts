import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellEntityMediatorComponent } from './atlas-shell-entity-mediator.component';

describe('AtlasShellEntityMediatorComponent', () => {
  let component: AtlasShellEntityMediatorComponent;
  let fixture: ComponentFixture<AtlasShellEntityMediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellEntityMediatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellEntityMediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
