import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CShellComponent } from './cshell.component';

describe('CShellComponent', () => {
  let component: CShellComponent;
  let fixture: ComponentFixture<CShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
