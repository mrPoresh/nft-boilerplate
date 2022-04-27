import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./signup-step-three.component.scss']
})
export class SignupStepThreeComponent extends BasePageComponentWithDialogs implements OnInit {

  @Output() isCompleted = new EventEmitter<string>();

  constructor(
    errorDialog: MatDialog,
    public moralisService: MoralisUserService
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {
    this.moralisService.postSaveApplyUser().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: res => {
        console.log("Step 3 Res ->", res);
      },
      error: error => {
        this.openErrorDialog();
      },
      complete: () => {
      }
    });

    this.moralisService.completeRegistrationSteps();
  }

  explore() {
    this.isCompleted.next('/');
  }

}
