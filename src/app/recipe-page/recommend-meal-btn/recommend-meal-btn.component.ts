import { Component, Input } from '@angular/core';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-recommend-meal-btn',
  templateUrl: './recommend-meal-btn.component.html',
  styleUrls: ['./recommend-meal-btn.component.scss']
})
export class RecommendMealBtnComponent {
  @Input() id = '';
  @Input() title = '';
  disabledButton: boolean = false;

  constructor(private websocketService: WebsocketService) {

  }

  ngOnInit() {
    this.websocketService.websocket.subscribe(() => { });

  }
  handleClick() {
    this.websocketService.sendMessage({ id: this.id, title: this.title })
    this.disabledButton = true;
    setTimeout(() => {
      this.disabledButton = false;
    }, 10000)
  }
}
