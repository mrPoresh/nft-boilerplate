import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { signupTrx } from 'src/app/router-translation.labels';

@Component({
  selector: 'app-signup-button',
  templateUrl: './signup-button.component.html',
  styleUrls: ['./signup-button.component.scss']
})
export class SignupButtonComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  signup() {
    this.router.navigate([this.router.url, signupTrx]);
  }

}
