import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';

import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';
import { User } from 'src/app/services/moralis/moralis-main.service';

import { BasePageComponentWithDialogs } from '../../base-components/base-page/base-page.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent extends BasePageComponentWithDialogs implements OnInit {

  User!: User

  settingsForm = this.formBuilder.group({
    username: null,
    email: null,
    avatar: null,
    avatarName: null,
  });

  constructor(
    public formBuilder: FormBuilder,
    public errorDialog: MatDialog,
    public moralisService: MoralisUserService,
  ) { 
    super(errorDialog) 
  }

  ngOnInit() {
    this.User = this.moralisService.getUser() ?? this.User; // ???????????

  }

  getImage(event: any) {
/*     console.log("From event ->", event.target.files[0]);
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("Result", reader.result);
    } */

    this.settingsForm.patchValue({
      avatar: event.target.files[0],
      avatarName: event.target.files[0].name,
    });

    

  }

  onSubmit(settingsForm: FormGroup) {
    console.log("Form ->", settingsForm);
    this.moralisService.saveUserChanges(this.User, settingsForm).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: res => {
        console.log("Result ->", res);
        this.User = res;
      },
      error: error => {
        console.log("Err", error);
      }
    });
  }

}
