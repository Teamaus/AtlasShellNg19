import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co13Component } from './co13.component';

describe('Co13Component', () => {
  let component: Co13Component;
  let fixture: ComponentFixture<Co13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
