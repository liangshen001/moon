import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRowComponent } from './ngx-row.component';

describe('NgxRowComponent', () => {
  let component: NgxRowComponent;
  let fixture: ComponentFixture<NgxRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
