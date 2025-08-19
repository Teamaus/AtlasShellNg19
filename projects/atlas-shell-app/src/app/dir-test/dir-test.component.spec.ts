import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirTestComponent } from './dir-test.component';

describe('DirTestComponent', () => {
  let component: DirTestComponent;
  let fixture: ComponentFixture<DirTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
