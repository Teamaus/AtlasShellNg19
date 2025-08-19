import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasEntitiesPanelComponent } from './atlas-entities-panel.component';

describe('AtlasEntitiesPanelComponent', () => {
  let component: AtlasEntitiesPanelComponent;
  let fixture: ComponentFixture<AtlasEntitiesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasEntitiesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasEntitiesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
