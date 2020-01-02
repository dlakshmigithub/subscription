import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, EmailValidator, RequiredValidator } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from '../../app-routing.module';
import { SubscriptionSaveService } from '../../_service/subscription-save.service';
import { SubscriptionFormComponent } from './subscription-form.component';
import { SubscriptionListComponent} from '../subscription-list/subscription-list.component';

describe('SubscriptionFormComponent', () => {
  let component: SubscriptionFormComponent;
  let subscribeService: SubscriptionSaveService;
  let fixture: ComponentFixture<SubscriptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
                AppRoutingModule, MatDialogModule],
      declarations: [ SubscriptionFormComponent, SubscriptionListComponent ],
      providers: [SubscriptionSaveService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when  email, subscritpion, password fields are empty', () => {
    expect(component.subscriptionForm.valid).toBeFalsy();
});

  it('email field validity', () => {
    let errors = {};
    const email = component.subscriptionForm.controls.email;
    expect(email.valid).toBeFalsy();

    // Email is required
    errors = component.subscriptionForm.controls.email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set mock data to Email
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set Email to valid data
    email.setValue('subscripe@subscripe.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});

  it('password field validity', () => {
    let errors = {};
    const password = component.subscriptionForm.controls.password;

    // Password is required
    errors = component.subscriptionForm.controls.password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set mock data to password
    password.setValue('password');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set password to valid data
    password.setValue("paswrod@123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
});

  it('submitting a subscriptionForm - list subscriped user at List-Subscription page', () => {
    expect(component.subscriptionForm.valid).toBeFalsy();
    component.subscriptionForm.controls['email'].setValue("test@test.com");
    component.subscriptionForm.controls['password'].setValue("password@123");
    component.subscriptionForm.controls['subscriptionType'].setValue("Advanced");
    expect(component.subscriptionForm.valid).toBeTruthy();

    // on submit, Trigger the submitSubscription function
    component.submitSubscription();
});
});
