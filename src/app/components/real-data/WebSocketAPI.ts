import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { RealDataComponent } from './real-data.component';
import { environment } from 'src/environments/environment';

export class WebSocketAPI {
    patientId :string;
    webSocketEndPoint: string = 'http://192.168.8.101:9001/data-display';
    // topic: string = "/topic/data-frontend";
    topic: string;
    stompClient: any;
    component: RealDataComponent;
    constructor(appComponent: RealDataComponent, patientId:string){
        this.component = appComponent;
        this.patientId = patientId;
        this.topic  = "/user/"+this.patientId+"/queue/data-frontend";
        console.log(this.patientId);
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        console.log("Message Recieved from Server :: " + message);

        //{"patientIdentity":{"patientId":20,"timestamp":"2019-12-12T13:19:45.413+0000"},"patientData":{"heartRate":70.0}}
        this.component.handleMessage(JSON.parse(message.body));
    }
}
