import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';
import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

enum steps  {
  stepOne = 0,
  stepTwo = 1
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent extends BasePageComponent implements AfterViewInit {

  isCompleted1: boolean = false;
  isCompleted2: boolean = false;

  selectedIndex = 0;

  @Output() closeEvent = new EventEmitter();

  constructor(
    public moralisService: MoralisUserService
  ) { super() }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.moralisService.requestRegistrationStep().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      console.log("User Step ->", res);
      if (res.registrationStep===steps.stepTwo){
        this.isCompleted1 = true;
        this.selectedIndex = 1; 
      }
    })
  }

  completeStepOne(result: boolean) {
    this.isCompleted1 = result;
    this.selectedIndex = 1; 
  }

  completeStepTwo(result: boolean) {
    this.isCompleted2 = result;
    this.selectedIndex = 2; 
  }

  completeStepThree(url:string) {
    this.closeDialog(url);
  }

  closeDialog(url: string) {
    this.closeEvent.next(url);
  }

}
