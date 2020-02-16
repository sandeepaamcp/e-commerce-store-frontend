import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { CarerService } from 'src/app/services/carer.service';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {

  modeForm = new FormGroup({
  });

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
    private patientService: PatientService, private carerService: CarerService, 
    private donorService: DonorService) {
  }

  patientPortalClick(): void {
    console.log(this.userDetails);
    if (this.patient != null) {
      this._router.navigate(['/patientdata']);
    }
    else {
      this._router.navigate(['/patientlog']);
    }
  }

  carerPortalClick(): void {
    if (this.carer != null) {
      this._router.navigate(['/carerdata']);
    }
    else {
      this.carerService.addNewCarer(this.userDetails.userId).then(res => {
        console.log(res);
        this.ngOnInit();
      }).catch(err => {
        console.log(err);
        this.errorString = err.message;
      });
    }
  }

  donorPortalClick(): void {
    console.log(this.userDetails);
    if (this.donor != null) {
      this._router.navigate(['/donordata']);
    }
    else {
      this.donorService.addNewDonor(this.userDetails.userId).then(res => {
        console.log(res);
        this.ngOnInit();
      }).catch(err => {
        console.log(err);
        this.errorString = err.message;
      });
    }
  }

  onBackButtonClick3(): void {
    this._router.navigate(['/login'])
  }

  ngOnInit() {
    this.errorString = "";
    this.userDetails = this.storage.get(environment.USER);
    if (this.userDetails == null) {
      this._router.navigate(['/login']);
    }
    else {
      this.getUserRegisteredOptions(this.userDetails.userId).subscribe(responseList => {
        console.log(responseList);
        this.patient = responseList[0];
        this.carer = responseList[1];
        this.donor = responseList[2];
        if (this.patient != null) {
          this.storage.set(environment.PATIENT, this.patient);
          this.patientDirect = "OPEN PATIENT PORTAL";
        }
        
        else {
          this.patientDirect = "I WANT TO BE REGISTERED AS A PATIENT";
        }

        if (this.carer != null) {
          this.storage.set(environment.CARER, this.carer);
          this.carerDirect = "OPEN CARER PORTAL";
        }
        else {
          this.carerDirect = "I WANT TO BE REGISTERED AS A CARER";
        }

        if (this.donor != null) {
          this.storage.set(environment.DONOR, this.donor);
          this.donorDirect = "OPEN DONOR PORTAL";
        }
        else {
          this.donorDirect = "I WANT TO BE REGISTERED AS A DONOR";
        }
      })
    }
  }

  private getUserRegisteredOptions(userId): Observable<any> {
    const patient = this.patientService.getPatientData(userId);
    const carer = this.carerService.getCarerData(userId);
    const donor = this.donorService.getDonorData(userId);
    return forkJoin([patient, carer, donor]);
  }
}
