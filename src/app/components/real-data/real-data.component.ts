import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { WebSocketAPI } from './WebSocketAPI';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-data',
  templateUrl: './real-data.component.html',
  styleUrls: ['./real-data.component.css']
})
export class RealDataComponent implements OnInit {

  @ViewChild(BaseChartDirective, null)
  public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state == undefined) {
      this.router.navigate(["/mode"]);
    }
    this.patientId = this.router.getCurrentNavigation().extras.state.patientId;
  }

  patientDataStatus = "Currently, the patient is offline!";
  isPatientAvailable = false;
  patientCurrentStatus = "Normal";
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  mainChart: any;
  patientId: string;


  ngOnInit() {
    // this.patientId = this.storage.get(environment.PATIENT).patientId;
    // console.log(this.patientId);
    this.webSocketAPI = new WebSocketAPI(this, this.patientId); //TODO: CIRCULAR DEPENDENCY NEEDED TO BE REMOVED
    this.connect();
    this.mainChart = this.chart;

    // TESTING: AUTOMATIC CHART DRAWING
    // let timerx=timer(2000, 150);

    // timerx.subscribe(tick => {
    //   let num = Math.floor(Math.random() * 60 + 1);
    //   let num2 = Math.floor(Math.random() * 60 + 1);
    // let data = JSON.stringify(this.lineChartData);
    // let dataJSON: any = JSON.parse(data);
    // let dataList: number[] = dataJSON[0].data;
    // dataList.splice(0, 1);
    // // dataList.splice(0,1);
    // dataList.push(num);
    // // dataList.push(num2);
    // // console.log(dataList);
    // this.lineChartData = [
    //   { data: dataList, label: "Heart Rate Data", fill: false, lineTension: 0 },
    // ];
    // this.updateChart();
    // });
  }

  updateChartValues(numList) {
    this.isPatientAvailable = true;
    this.patientDataStatus = "Patient is Online";
    let data = JSON.stringify(this.lineChartData);
    let dataJSON: any = JSON.parse(data);
    let dataList: number[] = dataJSON[0].data;
    for (var i = 0; i < numList.length; i++) {
      dataList.splice(0, 1);
      dataList.push(numList[i].patientData.heartRate);
    }

    this.lineChartData = [
      { data: dataList, label: "Heart Rate Data", fill: false, lineTension: 0 },
    ];
    this.updateChart();
  }

  updateChart() {
    this.mainChart.chart.update();
  }

  public lineChartData: any[] = [
    { data: Array.apply(null, new Array(400)).map(() => 0), label: "Heart Rate Data", fill: false, lineTension: 0, borderWidth: 1 },
  ];
  public lineChartLabels: string[] = Array.apply(null, new Array(400)).map(() => "");;
  public lineChartOptions: any = {
    animation: {
      duration: 0
    },
    elements: {
      point: {
        radius: 0
      }
    },
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType = "line";

  //websocket

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
    this.updateChartValues([message]);

  }
  ngOnDestroy() {
    this.disconnect();
  }
}
