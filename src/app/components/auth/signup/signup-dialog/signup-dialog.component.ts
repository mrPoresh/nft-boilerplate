import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, RouterEvent, NavigationStart } from '@angular/router';
import { filter, tap, take, takeUntil } from 'rxjs/operators';

import { DESKTOP_REGULAR, DialogConfig, FULL_DIALOG_CONFIG, MIX_DIALOG_CONFIG } from 'src/app/components/base-components/dialogs/dialog.config';
import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { DetectDeviceService } from 'src/app/services/utils/detect-device.service';

export interface SignUpDialogData {

}

@Component({
  template: ''
})
export class SignupDialogRouteComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,
    private detectDesktopService: DetectDeviceService,
    private route: ActivatedRoute
  ) { }

  dialogSize: DialogConfig = MIX_DIALOG_CONFIG;

  ngOnInit(): void {
    if (this.detectDesktopService.isDesktop()) {
      this.dialogSize = DESKTOP_REGULAR
    }

    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      ...this.dialogSize,
      panelClass: "signup",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([dialogRef.componentInstance.redirectUrl], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent extends BasePageComponent {

  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    private router: Router,
  ) {
    super();

/*     router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialogRef.close()),
      take(1),
      takeUntil(this.unsubscribe)
    ).subscribe(); */
  }

  public redirectUrl: string = "../"

  closeDialog(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }
}