import { TestBed } from '@angular/core/testing';

import { NgxRowService } from './ngx-row.service';

describe('NgxRowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRowService = TestBed.get(NgxRowService);
    expect(service).toBeTruthy();
  });
});
