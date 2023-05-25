import { Component, Input } from '@angular/core';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-recommend-msg',
  templateUrl: './recommend-msg.component.html',
  styleUrls: ['./recommend-msg.component.scss']
})
export class RecommendMsgComponent {
  @Input() id = "";
  @Input() title = '';
  hideMsg: boolean = true;
  messages: any[] = [];

  showLastMessage() {
    this.hideMsg = false;
    this.id = this.messages[0].id;
    this.title = this.messages[0].title;
    setTimeout(() => {
      this.hideMsg = true;

    }, 8000)

    setTimeout(() => {
      this.messages.splice(0, 1);
      if (this.messages.length) {
        this.showLastMessage();
      }
    }, 9000)

  }
  constructor(private websocketService: WebsocketService) {

    this.websocketService.websocket.subscribe((data: any) => {
      if (this.messages.length) this.messages.push(data);
      else {
        this.messages.push(data);
        this.showLastMessage();

      }
    }
    )

  }
}
