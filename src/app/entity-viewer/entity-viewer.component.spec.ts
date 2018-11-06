import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityViewerComponent } from './entity-viewer.component';

describe('EntityViewerComponent', () => {
  let component: EntityViewerComponent;
  let fixture: ComponentFixture<EntityViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
