import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss']
})
export class SignupStepTwoComponent extends BasePageComponentWithDialogs implements OnInit {

  registerForm2 = this.formBuilder.group({
    avatarFile: [],
    avatarName: [''],
    username: ['', [Validators.required]],
    ethAddress: ['', [Validators.required]],
  });

  @Output() isCompleted = new EventEmitter<boolean>();

  constructor(
    errorDialog: MatDialog,
    public formBuilder: FormBuilder,
    public cd: ChangeDetectorRef,
    public moralisService: MoralisUserService,
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {

  }

  onFileChange(event: any) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      this.registerForm2.patchValue({
        avatarName: event.target.files[0].name
      });
  
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerForm2.patchValue({
          avatarFile: reader.result?.toString().split(",")[1]
        });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }

  }

  onSubmit(registerForm2: FormGroup) {
    this.moralisService.postRegistrationStepData(registerForm2)?.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: res => {
        console.log("Step 2 Res ->", res);
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
