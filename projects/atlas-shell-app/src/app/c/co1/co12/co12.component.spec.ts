import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co12Component } from './co12.component';

describe('Co12Component', () => {
  let component: Co12Component;
  let fixture: ComponentFixture<Co12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
