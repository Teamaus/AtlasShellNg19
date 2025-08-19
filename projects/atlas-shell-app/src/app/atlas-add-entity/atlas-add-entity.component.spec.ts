import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasAddEntityComponent } from './atlas-add-entity.component';

describe('AtlasAddEntityComponent', () => {
  let component: AtlasAddEntityComponent;
  let fixture: ComponentFixture<AtlasAddEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasAddEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasAddEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
