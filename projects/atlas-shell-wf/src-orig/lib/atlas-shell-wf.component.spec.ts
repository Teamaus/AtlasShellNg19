import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasShellWfComponent } from './atlas-shell-wf.component';

describe('AtlasShellWfComponent', () => {
  let component: AtlasShellWfComponent;
  let fixture: ComponentFixture<AtlasShellWfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtlasShellWfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtlasShellWfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
