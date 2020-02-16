// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';
// import { RealDataComponent } from '../components/real-data/real-data.component';

// export class WebSocketAPI {
//     webSocketEndPoint: string = 'http://192.168.1.7:8081/front-end';
//     topic: string = "/topic/greetings";
//     stompClient: any;
//     component: RealDataComponent;
//     constructor(appComponent: RealDataComponent){
//         this.component = appComponent;
//     }
//     _connect() {
//         console.log("Initialize WebSocket Connection");
//         let ws = new SockJS(this.webSocketEndPoint);
//         this.stompClient = Stomp.over(ws);
//         const _this = this;
//         _this.stompClient.connect({}, function (frame) {
//             _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
//                 _this.onMessageReceived(sdkEvent);
//             });
//             //_this.stompClient.reconnect_delay = 2000;
//         }, this.errorCallBack);
//     };

//     _disconnect() {
//         if (this.stompClient !== null) {
//             this.stompClient.disconnect();
//         }
//         console.log("Disconnected");
//     }

//     // on error, schedule a reconnection attempt
//     errorCallBack(error) {
//         console.log("errorCallBack -> " + error)
//         setTimeout(() => {
//             this._connect();
//         }, 5000);
//     }

//  /**
//   * Send message to sever via web socket
//   * @param {*} message 
//   */
//     _send(message) {
//         console.log("calling logout api via web socket");
//         this.stompClient.send("/app/hello", {}, JSON.stringify(message));
//     }

//     onMessageReceived(message) {
//         console.log("Message Recieved from Server :: " + message);
//         this.component.handleMessage(JSON.stringify(message.body));
//     }
// }