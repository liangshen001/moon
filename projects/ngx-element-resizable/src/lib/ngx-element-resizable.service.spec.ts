import { TestBed } from '@angular/core/testing';

import { NgxElementResizableService } from './ngx-element-resizable.service';

describe('NgxElementResizableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxElementResizableService = TestBed.get(NgxElementResizableService);
    expect(service).toBeTruthy();
  });
});
