/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubscriptionSaveService } from './subscription-save.service';

describe('Service: SubscriptionSave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionSaveService]
    });
  });

  it('should ...', inject([SubscriptionSaveService], (service: SubscriptionSaveService) => {
    expect(service).toBeTruthy();
  }));
});
