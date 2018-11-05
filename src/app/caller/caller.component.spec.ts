import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallerComponent } from './caller.component';

describe('CallerComponent', () => {
  let component: CallerComponent;
  let fixture: ComponentFixture<CallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
