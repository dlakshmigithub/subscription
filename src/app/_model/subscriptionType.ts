import { ISubscriptionType } from './subscriptionType.interface';

export class SubscriptionType {
  subscriptionTypes: ISubscriptionType[] = [
    { value: 'Basic', name: 'Basic' },
    { value: 'Advanced', name: 'Advanced' },
    { value: 'Pro', name: 'Pro' }
    ];
  }

export const SubscriptionFields = {
    email: '',
    password: ''
  };

export const SubscriptionValidation = {
    email: {
        required: 'Please enter the Email.',
        maxlength: 'Please enter the Email with only max. 50 characters long.',
        asyncval: 'Please enter the valid Email.'
    },
    password: {
        required: 'Please enter the password.',
        maxlength: 'Please enter the password with only max. 50 characters long.',
        pattern: 'Please enter the password with 8 characters long, at least one character and one special character.'
    }
  };

