import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

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
    private formBuilder: FormBuilder,
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {

  }

}
