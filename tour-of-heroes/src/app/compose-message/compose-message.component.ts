import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compose-message',
  templateUrl: './compose-message.component.html',
  styleUrls: ['./compose-message.component.css']
})
export class ComposeMessageComponent implements OnInit {
  details: string;
  message: string;
  sending = false;

  constructor(private router: Router) {
  }

  send() {
    this.sending = true;
    this.details = '发送信息中...';
    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  closePopup() {
    // 提供null值给指定的出口，清空出口的内容
    this.router.navigate([
      {
        outlets: {popup: null}
      }
    ]);
  }

  cancel() {
    this.closePopup();
  }

  ngOnInit() {
  }

}
