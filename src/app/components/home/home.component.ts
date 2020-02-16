import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MobileSearchService } from 'src/app/services/mobile-search.service';
import { environment } from 'src/environments/environment';
import { FavMobilesService } from 'src/app/services/fav-mobiles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFilters: boolean = false;

  mobileManufacturerList: any = [];
  mobilesList: any = [];

  selectedManufacturer: any = null;
  manufacturerStr = "Manufacturer";
  isFilledAllFields = false;

  selectedVariation: any = null;
  variationStr = "Criteria";

  variationList = ["GREATER_THAN", "LESS_THAN"];

  price: any = null;

  keyword: any = null;

  userDetails: any = null;

  isLoggedIn: any = false;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private mobileSearchService: MobileSearchService, private favMobileService:FavMobilesService) { }


  ngOnInit() {
    this.mobileSearchService.getMobileManufacturers().then(val => {
      console.log(val);
      this.mobileManufacturerList = val;
    });

    this.mobileSearchService.getInitialMobilesList().then(list => {
      this.mobilesList = list;

      console.log(this.mobilesList);
    });

    this.userDetails = this.storage.get(environment.USER);
      if (this.userDetails != null) {
        this.isLoggedIn = true;
      }
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

    if (this.showFilters) {
      if (this.selectedManufacturer != null && this.price != null && this.selectedVariation != null) {
        this.isFilledAllFields = true;
        this.mobileSearchService
          .getSearchListFromFilters(this.selectedManufacturer, this.price, this.selectedVariation)
          .then(mobilesList => {
            console.log(mobilesList);
            this.mobilesList = mobilesList;
          });
      }
    }
    else {
      if (this.keyword != null) {
        this.mobileSearchService
          .searchByKeyword(this.keyword)
          .then(mobilesList => {
            console.log(mobilesList);
            this.mobilesList = mobilesList;
          });
      }

    }
  }

  private addFavMobile(mobile){
    if(!this.isLoggedIn){
      this._router.navigate(['/login']);
    }
    else{
      console.log(this.userDetails.userId, mobile.specificationId);
      this.favMobileService.addNewFavMobile(this.userDetails.userId, mobile.specificationId).then(res=>{
        console.log(res);
        console.log("save success");
      })
    }
  }

  private goToMobileSpecs(mobile){
    this._router.navigate(['/mobile-specs'], { state: { mobileDetails: mobile }});
  }
}
