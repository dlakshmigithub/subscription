import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { SubscriptionType, SubscriptionValidation, SubscriptionFields  } from '../../_model/subscriptionType';
import { SubscriptionSaveService } from '../../_service/subscription-save.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})

export class SubscriptionFormComponent implements OnInit {
  private subscriptions = new Subscription();
  subscriptionForm: FormGroup;
  submitted = false;
  errorMessage = false;
  typed: any = {};
  emailError = false;
  passwordError = false;
  discard = false;

  public subValueType = new SubscriptionType();
  // pattern to validate the password entry.
  private passwordPattern = '^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$';
  // pattern to validate the email entry.
  private emailPattern =  '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';

  constructor(private fb: FormBuilder, private subscriptionService: SubscriptionSaveService,
              private router: Router,  public dialog: MatDialog) { }

  ngOnInit() {
    this.validateForm();
  }

   /**
    * @description create FormGroup to define email, subscriptionType and password
    * - form controls with required, maxLength and pattern validations.
    * @param email string
    * @param subscriptionType string
    * @param password string
    */
  validateForm() {
    this.subscriptionForm = this.fb.group({
      email : ['', [Validators.required, Validators.maxLength(40), Validators.pattern(this.emailPattern)]],
      subscriptionType : ['', Validators.required],
      password : ['', [Validators.required,  Validators.maxLength(25), Validators.pattern(this.passwordPattern)]]
    });
    this.subscriptionForm.get('subscriptionType').patchValue('Advanced');
    this.formValueChanges();
    }

  // set debouncetime on form value changes to check - user stopped typing
  formValueChanges() {
    Object.keys(this.subscriptionForm.controls).forEach(key => {
      this.subscriptions =  this.subscriptionForm.get(key).valueChanges.pipe(debounceTime(1000)).subscribe(() => {
          this.typed[key] = true;
          this.errorMessage = false;
          this.submitted =  false;
          /* set flag to show error message only when user stopped typing in the particular
          field */
          if (key !== 'email') {
          this.emailError = true;
          } else { this.emailError = false; }
          if (key !== 'password') {
          this.passwordError = true;
        } else { this.passwordError = false; }
          });
      });
  }

  // helper function to check error condition
  hasError(controlName: string, validationName: string): boolean {
    return this.subscriptionForm.get(controlName).hasError(validationName)
           && (this.typed[controlName] || this.submitted);
  }

  /**
   * Method to save the subscription form entries
   * Save the input Email, SubscriptionType and Password into subscription service if form is valid
   * and navigate to subscription-list page.
   * @Param email string
   * @Param subscriptionType  string
   * @param password string
   * @See listsubscription with email, subscriptionType and password
   */

  submitSubscription() {
      this.submitted = true;
      this.errorMessage = true;
      if (this.subscriptionForm.valid) {
       this.subscriptionService.saveSubscriptionValue(this.subscriptionForm.value);
       this.router.navigate(['/list-user-subscription']);
      } else {
        this.formValueChanges();
      }
  }

  /**
   * @description Method to reset the form.
   * @param email string
   * @param subscriptionType string
   * @param password string
   * @see subscription type set as Advanced; email and password will be cleared. *
   */
  onDiscardConfirm(): void {
      const dialogRef = this.dialog.open(ConfirmationComponent, {  width: '300px', position: {
        top: '100px'
      }});
      this.subscriptions = dialogRef.afterClosed().subscribe(result => {
        if (result && result.confirmed) {
          this.discard = true;
          this.errorMessage = false;
          this.submitted = false;
          this.subscriptionForm.reset();
          this.subscriptionForm.get('subscriptionType').patchValue('Advanced');
          this.emailError = true;
          this.passwordError = true;
          this.subscriptions.unsubscribe();
          this.subscriptionForm.get('email').markAsUntouched();
          this.subscriptionForm.get('password').markAsUntouched();
        }
      });
    }
}
