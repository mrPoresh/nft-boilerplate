import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { BasePageComponent } from 'src/app/components/base-components/base-page/base-page.component';

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

  constructor() { super() }

  ngOnInit() {

  }

  ngAfterViewInit() {
    
  }

}
