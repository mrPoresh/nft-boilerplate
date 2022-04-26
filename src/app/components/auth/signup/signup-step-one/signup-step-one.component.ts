import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss']
})
export class SignupStepOneComponent extends BasePageComponentWithDialogs implements OnInit {

  formSubmited: boolean = false;
  hidePassword: boolean = true;

  registerForm1 = this.formBuilder.group({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(7) ]),
  })

  @Output() isCompleted = new EventEmitter<boolean>();

  constructor(
    public errorDialog: MatDialog,
    public formBuilder: FormBuilder,
    public moralisService: MoralisUserService,
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {

  }

  onSubmit(registerForm1: FormGroup) {
    if (this.formSubmited || !this.registerForm1.valid) return;
    this.moralisService.postRegistrationStepAddUser(registerForm1).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: res => {
        console.log("Step 1 Res ->", res);
      },
      error: error => {
        this.openErrorDialog();
      },
      complete: () => {
        this.isCompleted.next(true);
      }
    })

  }

}
