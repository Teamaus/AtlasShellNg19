import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellRootEntityPanelComponent } from './atlas-shell-root-entity-panel.component';

describe('AtlasShellRootEntityPanelComponent', () => {
  let component: AtlasShellRootEntityPanelComponent;
  let fixture: ComponentFixture<AtlasShellRootEntityPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellRootEntityPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellRootEntityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
