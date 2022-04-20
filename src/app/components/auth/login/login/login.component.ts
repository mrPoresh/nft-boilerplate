import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';
//import { LoginEmailResponse, UserInfo } from 'src/app/services/auth/login/login.models';
import { MatDialog } from '@angular/material/dialog';
//import { WrongPasswordDialogComponent } from './wrong-password/wrong-password-dialog/wrong-password-dialog.component';
import { DialogConfig, SMALL_DIALOG_CONFIG } from 'src/app/components/base-components/dialogs/dialog.config';
/* import { TranslationConfig } from 'src/app/utils/translate-config'; */
/* import { lostPasswordTrx, signUpTrx, connectWalletTrx } from 'src/app/router-translation.labels'; */
import { DetectDeviceService } from 'src/app/services/utils/detect-device.service';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePageComponentWithDialogs {

  formSubmited: boolean = false;

  //loginResponse: UserInfo;
  hidePassword = true;
  dialogSize: DialogConfig = SMALL_DIALOG_CONFIG;
/*   singnUrl: string = this.translationConfig.getTranslation(signUpTrx);
  lostPasswordUrl: string = this.translationConfig.getTranslation(lostPasswordTrx);
  connectWalletUrl: string = this.translationConfig.getTranslation(connectWalletTrx); */

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  @Output() closeEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public moralisService: MoralisUserService,
    public formBuilder: FormBuilder,
    protected detectDesktopService: DetectDeviceService,
    public errorDialog: MatDialog,
    private router: Router,
  ) {
    super(errorDialog)
  }

  ngOnInit() {

  }

  closeDialog(url: string): void {
    this.closeEvent.next(url);
  }

  onSubmit(loginForm: any) {
    if (this.formSubmited) return;
    this.formSubmited = true;
    console.log("Login Frorm ->", loginForm);
  }

  loginSuccessfull() {
    this.closeDialog('../');
  }

  signup() {
    console.log("SignUp");
  }

  lostPassword() {
    console.log("Lost Pass");
  }

  connectMetamask() {
    this.closeDialog("../");
     this.moralisService.userLoginWithMetamask().subscribe({
      complete: () => {
        this.openSuccessDialog("MetaMask was successfully connected", "Success");
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log("User Error ->", err);
        this.openErrorDialog("MetaMask was successfully denied", "Error");
        this.router.navigate(['/']);
      },
    });
  }

}