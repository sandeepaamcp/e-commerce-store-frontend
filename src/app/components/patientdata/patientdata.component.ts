import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patientdata',
  templateUrl: './patientdata.component.html',
  styleUrls: ['./patientdata.component.css']
})
export class PatientdataComponent implements OnInit {

  private patient;
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService) {
      this.patient = storage.get(environment.PATIENT);
  }

  addNewIoTDevice(): void {
    this._router.navigate(['/add-device']);
  }

  setCarers(): void {
    this._router.navigate(['/set-carers']);
  }

  getRealtimeData(): void {
    this._router.navigate(['/real-data'], { state: { patientId: this.patient.patientId } });
  }

  viewPatientProfile(): void {
    this._router.navigate(['/patientprofile']);
  }

  getMedicalHistory(): void {
    this._router.navigate(['/medical-history'], { state: { patientId: this.patient.patientId,
       patientName:this.patient.patientName } });
  }

  ngOnInit() {
  }

}
