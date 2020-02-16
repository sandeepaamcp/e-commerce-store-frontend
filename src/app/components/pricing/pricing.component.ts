import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  options = {};

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.options = this.getOptions();
  }

  getOptions(){
    return this.config.getConfig().options;
  }

}
