import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.component.html',
  styleUrls: ['./locate.component.css']
})
export class LocateComponent implements OnInit {

  latitude = 7.2906;
  longitude = 80.6337;

  constructor() { }

  ngOnInit() {
  }

}
