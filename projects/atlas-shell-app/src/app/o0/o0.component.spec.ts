import { ComponentFixture, TestBed } from '@angular/core/testing';

import { O0Component } from './o0.component';

describe('O0Component', () => {
  let component: O0Component;
  let fixture: ComponentFixture<O0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ O0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(O0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
