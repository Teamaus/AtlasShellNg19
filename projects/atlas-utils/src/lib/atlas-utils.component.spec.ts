import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasUtilsComponent } from './atlas-utils.component';

describe('AtlasUtilsComponent', () => {
  let component: AtlasUtilsComponent;
  let fixture: ComponentFixture<AtlasUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasUtilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
