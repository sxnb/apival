import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesViewerComponent } from './properties-viewer.component';

describe('PropertiesViewerComponent', () => {
  let component: PropertiesViewerComponent;
  let fixture: ComponentFixture<PropertiesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
