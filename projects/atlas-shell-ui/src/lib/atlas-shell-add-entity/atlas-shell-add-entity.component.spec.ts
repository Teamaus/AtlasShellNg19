import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellAddEntityComponent } from './atlas-shell-add-entity.component';

describe('AtlasShellAddEntityComponent', () => {
  let component: AtlasShellAddEntityComponent;
  let fixture: ComponentFixture<AtlasShellAddEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasShellAddEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasShellAddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
