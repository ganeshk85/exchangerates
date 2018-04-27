import { TestBed, inject } from '@angular/core/testing';

import { ExchangerateService } from './exchangerate.service';

describe('ExchangerateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangerateService]
    });
  });

  it('should be created', inject([ExchangerateService], (service: ExchangerateService) => {
    expect(service).toBeTruthy();
  }));
});
