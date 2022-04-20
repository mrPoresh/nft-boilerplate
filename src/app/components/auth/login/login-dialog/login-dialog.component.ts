import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { MIX_DIALOG_CONFIG } from 'src/app/components/base-components/dialogs/dialog.config';

export interface LoginDialogData {

}

@Component({
  template: ''
})
export class LoginDialogRouteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      ...MIX_DIALOG_CONFIG,
      backdropClass: "fullPrimaryBackdropBackground",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([dialogRef.componentInstance.redirectUrl]);
    });
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginDialogData
    
  ) { }

  public redirectUrl: string = "../"

  closeDialog(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
