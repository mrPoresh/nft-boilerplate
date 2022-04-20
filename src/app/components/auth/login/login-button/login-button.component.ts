import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { loginTrx } from 'src/app/router-translation.labels';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    this.router.navigate([this.router.url, loginTrx]);
  }

}
