import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent extends BasePageComponentWithDialogs implements OnInit {

  @Output() isCompleted = new EventEmitter<string>();

  constructor(
    errorDialog: MatDialog,
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {

  }

  explore() {
    this.isCompleted.next('/');
  }

}
