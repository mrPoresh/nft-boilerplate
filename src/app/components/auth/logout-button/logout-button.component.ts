import { Component, OnInit } from '@angular/core';

import { MoralisUserService } from 'src/app/services/moralis/moralis-user.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(
    public moralisService: MoralisUserService,
  ) { }

  ngOnInit() {

  }

  logout() {
    this.moralisService.userLogOut();
    location.reload();
  }

}