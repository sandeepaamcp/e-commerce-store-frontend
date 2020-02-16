import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { CarerService } from 'src/app/services/carer.service';


@Component({
  selector: 'app-carerdata',
  templateUrl: './carerdata.component.html',
  styleUrls: ['./carerdata.component.css']
})
export class CarerdataComponent implements OnInit {

  private carer;
  private carerRelationships;
  private hasCarerRelationship: boolean = false;
  private selectedPatient;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService,
    private carerService: CarerService) {
  }

  selectPatientRelationship(patientRelationship) {
    this.selectedPatient = patientRelationship;
  }

  onBackButtonClick(): void {
    this._router.navigate(['/carerlog']);
  }

  removePatientRelationship(patientId) {
    this.carerService.removeCarerRelationship(patientId, this.carer.carerId).then(() => {
      this.ngOnInit();
    })
    .catch((err)=>{
      console.log(err);
      this._router.navigate(['/login']);
    });

    // this._router.navigate(['/patientprofile']);
  }

  onBackButtonClick3(): void {
    console.log(this.selectedPatient.patientId);
    this._router.navigate(['/real-data'], { state: { patientId: this.selectedPatient.patientId }});
  }

  ngOnInit() {
    this.carer = this.storage.get(environment.CARER);
    if (this.carer == null) {
      this._router.navigate(['/login']);
    }
    this.getPatientsOfTheCarer();
  }

  private getPatientsOfTheCarer() {
    this.carerService.getCarerRelationships(this.carer.carerId).then((res) => {
      console.log(res);
      if (res != undefined || res != null) {
        {
          if (res.length != 0) {
            console.log(res);
            this.carerRelationships = res;
            this.hasCarerRelationship = true;
            this.selectedPatient = res[0];
          }
        }

      }
      else {
        this.carerRelationships = false;
      }
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    })
  }

  private deleteCarer() {
    //TODO: ADD WARNING DIALOG BOX BEFORE DELETE
    console.log("removing carer" + this.carer);
    this.carerService.removeCarer(this.carer.carerId).then(() => {
      this.storage.remove(environment.CARER);
      this._router.navigate(['/mode']);
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    })
  }

  getMedicalHistory(): void {
    this._router.navigate(['/medical-history'], { state: { 
       patientId: this.selectedPatient.patientId,
       patientName:this.selectedPatient.patientName } });
  }
}