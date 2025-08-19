import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasRootEntityComponent } from './atlas-root-entity.component';

describe('AtlasRootEntityComponent', () => {
  let component: AtlasRootEntityComponent;
  let fixture: ComponentFixture<AtlasRootEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasRootEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasRootEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
