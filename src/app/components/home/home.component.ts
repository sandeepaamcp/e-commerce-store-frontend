import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { MobileSearchService } from 'src/app/services/mobile-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFilters: boolean = false;

  mobileManufacturerList: any = [];

  selectedManufacturer: any = null;
  manufacturerStr = "Manufacturer";
  isFilledAllFields = false;

  selectedVariation: any = null;
  variationStr = "Criteria";

  variationList = ["GREATER_THAN", "LESS_THAN"];

  price: any = null;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private mobileSearchService: MobileSearchService) { }


  ngOnInit() {
    this.mobileSearchService.getMobileManufacturers().then(val => {
      console.log(val);
      this.mobileManufacturerList = val;
    });
  }

  toggleFilterSearch() {
    if (this.showFilters == false) {
      this.showFilters = true;
    }
    else {
      this.showFilters = false;
    }
  }

  setManufacturer(manufacturer) {
    console.log(manufacturer);
    this.selectedManufacturer = manufacturer;
    this.manufacturerStr = manufacturer;
  }

  setVariation(variation) {
    console.log(variation);
    this.selectedVariation = variation;
    this.variationStr = variation;
  }

  getMobilesSearchList() {
    if (this.selectedManufacturer != null && this.price != null && this.selectedVariation != null) {
      this.isFilledAllFields = true;
      this.mobileSearchService
        .getSearchListFromFilters(this.selectedManufacturer, this.price, this.selectedVariation)
        .then(mobilesList => {
          console.log(mobilesList);
        });
    }

  }
}
