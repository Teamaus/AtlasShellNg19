import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellEntityPanelComponent } from './atlas-shell-entity-panel.component';

describe('AtlasShellEntityPanelComponent', () => {
  let component: AtlasShellEntityPanelComponent;
  let fixture: ComponentFixture<AtlasShellEntityPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellEntityPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellEntityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
