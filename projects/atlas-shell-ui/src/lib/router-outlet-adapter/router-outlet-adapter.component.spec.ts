import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterOutletAdapterComponent } from './router-outlet-adapter.component';

describe('RouterOutletAdapterComponent', () => {
  let component: RouterOutletAdapterComponent;
  let fixture: ComponentFixture<RouterOutletAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterOutletAdapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterOutletAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
