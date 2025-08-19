import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasEntityMediatorComponent } from './atlas-entity-mediator.component';

describe('AtlasEntityMediatorComponent', () => {
  let component: AtlasEntityMediatorComponent;
  let fixture: ComponentFixture<AtlasEntityMediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasEntityMediatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasEntityMediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
