import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-endmarketing',
  templateUrl: './endmarketing.component.html',
  styleUrls: ['./endmarketing.component.css']
})
export class EndmarketingComponent implements OnInit {

  feature = {};

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.feature = this.getFeature();
  }

  getFeature(){
    return this.config.getConfig().feature;
  }

}
