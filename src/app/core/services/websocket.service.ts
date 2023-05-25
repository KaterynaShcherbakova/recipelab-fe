import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";


@Injectable({
    providedIn: "root"
})
export class WebsocketService {
    websocket : any;

    constructor() {
       this.websocket = webSocket("ws://localhost:8765");
    }
  
  
    sendMessage(message : any) {
      if(this.websocket && !this.websocket.closed) this.websocket.next(message);
    }
  
    
    ngOnDestroy() {
      this.websocket.complete();
    }
}