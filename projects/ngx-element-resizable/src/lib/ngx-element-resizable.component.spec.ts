import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxElementResizableComponent } from './ngx-element-resizable.component';

describe('NgxElementResizableComponent', () => {
  let component: NgxElementResizableComponent;
  let fixture: ComponentFixture<NgxElementResizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxElementResizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxElementResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
