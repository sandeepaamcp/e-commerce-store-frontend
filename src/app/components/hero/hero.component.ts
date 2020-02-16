import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {


  intro = {};


  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.intro = this.getIntro();
  }

  getIntro(){
    return this.config.getConfig().intro;
  }

}
