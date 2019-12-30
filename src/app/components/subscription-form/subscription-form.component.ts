import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { SubscriptionType  } from '../../_model/subscriptionType';
import { SubscriptionSaveService } from '../../_service/subscription-save.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  subscriptionForm: FormGroup;
  submitted = false;
  errors: string[] = [];


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

  validateForm() {

    this.subscriptionForm = this.fb.group({
      email : ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
      subscriptionType : ['', Validators.required],
      password : ['', [Validators.required,  Validators.maxLength(50), Validators.pattern(this.passwordPattern)]]
    });

    this.subscriptionForm.get('subscriptionType').patchValue('Advanced');

    this.subscriptionForm.statusChanges.subscribe(status => {
      console.log('status');
      console.log(status);
      this.resetErrorMessages();
      this.generateErrorMessages();
    });
    }

    resetErrorMessages() {
    this.errors.length = 0;
    }



  hasError(controlName: string, validationName: string): boolean {
      console.log(this.subscriptionForm.get(controlName));
      console.log(this.subscriptionForm.get(controlName).hasError(validationName) &&
      (this.subscriptionForm.get(controlName).touched || this.submitted));
      return this.subscriptionForm.get(controlName).hasError(validationName) &&
            (this.subscriptionForm.get(controlName).touched || this.submitted);
  }


  generateErrorMessages() {
    Object.keys(this.subscriptionForm.controls).forEach((controlName) => {
      const control = this.subscriptionForm.controls[controlName];
      const errors = control.errors;
      if (errors === null || errors.count === 0) {
        return true;
      }
      if (errors.required) {
        this.errors.push(`${controlName} is required`);
      }
      if (errors.maxlength) {
        this.errors.push(` Please enter ${controlName} with only 50 characters.`);
      }
      if (errors.pattern) {
        this.errors.push(` Please  enter valid ${controlName}.`);
      }
    });
  }

    submitSubscription() {
    console.log('camein');
    if (this.subscriptionForm.valid) {
      console.log('submitentere');
      this.submitted = true;
      this.subscriptionService.saveSubscriptionValue(this.subscriptionForm.value);
      this.router.navigate(['/list-user-subscription']);
    } else {

     //  this.subscriptionForm.errors;
    }

  }

  onDiscardConfirm(): void {

      const dialogRef = this.dialog.open(ConfirmationComponent, {  width: '300px', position: {
        top: '100px'
      }});
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.confirmed) {
          this.subscriptionForm.reset();
          this.subscriptionForm.get('subscriptionType').patchValue('Advanced');
        }
      });
    }

}
