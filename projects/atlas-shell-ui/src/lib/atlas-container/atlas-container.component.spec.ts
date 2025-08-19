import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasContainerComponent } from './atlas-container.component';

describe('AtlasContainerComponent', () => {
  let component: AtlasContainerComponent;
  let fixture: ComponentFixture<AtlasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
