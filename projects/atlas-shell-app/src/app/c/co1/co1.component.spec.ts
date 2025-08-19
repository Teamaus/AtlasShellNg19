import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CO1Component } from './co1.component';

describe('CO1Component', () => {
  let component: CO1Component;
  let fixture: ComponentFixture<CO1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CO1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CO1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
