import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellLogicComponent } from './atlas-shell-logic.component';

describe('AtlasShellLogicComponent', () => {
  let component: AtlasShellLogicComponent;
  let fixture: ComponentFixture<AtlasShellLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasShellLogicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtlasShellLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
