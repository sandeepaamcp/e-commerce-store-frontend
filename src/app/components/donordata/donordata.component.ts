import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { DonorService } from 'src/app/services/donor.service';
@Component({
  selector: 'app-donordata',
  templateUrl: './donordata.component.html',
  styleUrls: ['./donordata.component.css']
})
export class DonordataComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService,
    private donorService: DonorService) { }

  private donor;
  private mobiles;
  private hasMobiles: boolean = false;

  onBackButtonClick(): void {
    this._router.navigate(['/donorlog']);
  }

  removeMobile(mobile) {
    this.donorService.removeMobile(this.donor.donorId, mobile.phoneId).then(() => {
      this.ngOnInit();
    })
      .catch((err) => {
        console.log(err);
        this._router.navigate(['/login']);
      });

    // this._router.navigate(['/patientprofile']);
  }

  onBackButtonClick3(): void {
    this._router.navigate(['/real-data']);
  }

  ngOnInit() {
    this.donor = this.storage.get(environment.DONOR);
    if (this.donor == null) {
      this._router.navigate(['/login']);
    }
    this.getMobilesOfTheDonor();
  }

  private getMobilesOfTheDonor() {
    this.donorService.getMobiles(this.donor.donorId).then((res) => {
      console.log(res);
      if (res != undefined || res != null) {
        {
          if (res.length != 0) {
            console.log(res);
            this.mobiles = res;
            this.hasMobiles = true;
            // this.selectedPatient = res[0];
          }
        }

      }
      else {
        this.mobiles = false;
      }
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    })
  }

  private deleteDonor() {
    //TODO: ADD WARNING DIALOG BOX BEFORE DELETE
    console.log("removing donor" + this.donor);
    this.donorService.removeDonor(this.donor.donorId).then(() => {
      this.storage.remove(environment.DONOR);
      this._router.navigate(['/mode']);
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    })

  }

  private addMobile() {
    this.donorService.addNewMobile(this.donor.donorId).then(() => {
      this.ngOnInit();
    }
    ).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    });
  }

}
