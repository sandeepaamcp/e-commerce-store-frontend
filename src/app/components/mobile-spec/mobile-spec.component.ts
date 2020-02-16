import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-spec',
  templateUrl: './mobile-spec.component.html',
  styleUrls: ['./mobile-spec.component.css']
})
export class MobileSpecComponent implements OnInit {

  mobileDetails: any;
  mobileName: any;
  dealerDeatails:any;
  constructor(private router: Router) {
    if (this.router.getCurrentNavigation().extras.state == undefined) {
      this.router.navigate(["/Home"]);
    }
    this.mobileDetails = this.router.getCurrentNavigation().extras.state.mobileDetails;
    this.mobileName = this.mobileDetails.mobile.manufacturer 
    + " " + this.mobileDetails.mobile.modelName;
    this.dealerDeatails = this.mobileDetails.dealer.dealerName
    +"\n"+this.mobileDetails.dealer.address + "\n" + this.mobileDetails.dealer.dealerEmail;
    console.log(this.mobileName);
    console.log(this.mobileDetails);

  }

  ngOnInit() {
  }



}
