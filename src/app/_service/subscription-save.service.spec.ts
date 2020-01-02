/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { SubscriptionSaveService } from './subscription-save.service';
import { SubscriptionListComponent } from '../components/subscription-list/subscription-list.component';

describe('Service: SubscriptionSave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionSaveService]
    });
  });

  it('should ...', inject([SubscriptionSaveService], (service: SubscriptionSaveService) => {
    expect(service).toBeTruthy();
  }));

  it('Save subscription form value  in service', inject([SubscriptionSaveService], (service: SubscriptionSaveService) => {
    const mockData  = { email: 'test@test.com', subscriptionType: 'Advanced', password: 'Qkrjri@ption3'};
    service.saveSubscriptionValue(mockData);
    expect(service.subscriptionValue[0].email).toBe('test@test.com');
    expect(service.subscriptionValue[0].subscriptionType).toBe('Advanced');
    expect(service.subscriptionValue[0].password).toBe('Qkrjri@ption3');
    }));

  it('Get subscription form value  in service', inject([SubscriptionSaveService], (service: SubscriptionSaveService) => {
    service.subscriptionValue = [{ email: 'test@test.com', subscriptionType: 'Pro', password: 'Qkrje@2df'}];
    const  restult = service.getSubscriptionValue();
    expect(restult[0].email).toBe('test@test.com');
    expect(restult[0].subscriptionType).toBe('Pro');
    expect(restult[0].password).toBe('Qkrje@2df');
    }));
});
