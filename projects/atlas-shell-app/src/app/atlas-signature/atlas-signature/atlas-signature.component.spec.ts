import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasSignatureComponent } from './atlas-signature.component';

describe('AtlasSignatureComponent', () => {
  let component: AtlasSignatureComponent;
  let fixture: ComponentFixture<AtlasSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
