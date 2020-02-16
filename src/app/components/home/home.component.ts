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
  private patientDirect: string = "RETRIEVING DATA";
  private patient;

  private carerDirect: string = "RETRIEVING DATA";
  private carer;

  private donorDirect: string = "RETRIEVING DATA";
  private donor;

  private userDetails;

  private errorString = "";

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private mobileSearchService: MobileSearchService) { }


  ngOnInit() {
    this.mobileSearchService.getMobileManufacturers().then(val => {
      console.log(val);
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
}
