import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellAddEntityV2Component } from './atlas-shell-add-entity-v2.component';

describe('AtlasShellAddEntityV2Component', () => {
  let component: AtlasShellAddEntityV2Component;
  let fixture: ComponentFixture<AtlasShellAddEntityV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellAddEntityV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellAddEntityV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
