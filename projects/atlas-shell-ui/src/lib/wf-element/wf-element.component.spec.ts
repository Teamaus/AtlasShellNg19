import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfElementComponent } from './wf-element.component';

describe('WfElementComponent', () => {
  let component: WfElementComponent;
  let fixture: ComponentFixture<WfElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WfElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
