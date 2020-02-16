import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  private patient;
  private user;

  private telephone;
  private name;
  private email;
  private BMI;
  private age;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private patientService: PatientService) {
    this.user = storage.get(environment.USER);
    this.patient = storage.get(environment.PATIENT);

    if (this.user != null && this.patient != null) {
      this.name = this.user.userName;
      this.email = this.user.email;
      this.BMI = (this.patient.weight / (this.patient.height * this.patient.height / 10000)).toFixed(2);

      var today = new Date();
      var birthDate = new Date(this.patient.birthDate);
      this.age = today.getFullYear() - birthDate.getFullYear();
    }
    else {
      _router.navigate(['/login']);
    }
  }

  private deletePatient() {
    console.log("removing patient" + this.patient);
    this.patientService.removePatient(this.patient.patientId).then(() => {
      this.storage.remove(environment.PATIENT);
      this._router.navigate(['/mode']);
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/mode']);
    })

  }

  ngOnInit() {
  }

}
