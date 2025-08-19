import { ComponentFixture, TestBed } from '@angular/core/testing';

import { O1Component } from './o1.component';

describe('O1Component', () => {
  let component: O1Component;
  let fixture: ComponentFixture<O1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ O1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(O1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
