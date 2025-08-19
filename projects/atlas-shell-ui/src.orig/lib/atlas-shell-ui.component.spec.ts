import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellUiComponent } from './atlas-shell-ui.component';

describe('AtlasShellUiComponent', () => {
  let component: AtlasShellUiComponent;
  let fixture: ComponentFixture<AtlasShellUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtlasShellUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtlasShellUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
