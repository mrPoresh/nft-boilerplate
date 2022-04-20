import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-close-dialog-button',
  templateUrl: './close-dialog-button.component.html',
  styleUrls: ['./close-dialog-button.component.scss']
})
export class CloseDialogButtonComponent implements OnInit {

  constructor() { }

  @Output() closeEvent = new EventEmitter<string>();
  @Input() customClass: string = '';

  callLinkClickedParent(url?: string): void {
    if (url) this.closeEvent.next(url);
    else this.closeEvent.next("../");
  }

  ngOnInit() {
    
  }

}