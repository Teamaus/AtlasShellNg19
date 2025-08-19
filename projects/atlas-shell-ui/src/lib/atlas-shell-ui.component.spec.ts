import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellUIComponent } from './atlas-shell-ui.component';

describe('AtlasShellUIComponent', () => {
  let component: AtlasShellUIComponent;
  let fixture: ComponentFixture<AtlasShellUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
