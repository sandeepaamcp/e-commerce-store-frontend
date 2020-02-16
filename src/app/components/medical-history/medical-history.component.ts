import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'ngx-webstorage-service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  patientId: String;
  patientName: String;

  patientNotifications: any;


  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router,
    private patientService: PatientService) {
    if (this.router.getCurrentNavigation().extras.state == undefined) {
      this.router.navigate(["/mode"]);
    }
    this.patientName = this.router.getCurrentNavigation().extras.state.patientName;
    this.patientId = this.router.getCurrentNavigation().extras.state.patientId;

    patientService.getPatientNotifications(this.patientId).then(records => {
      this.patientNotifications = records;
      let i = 0;
      for (i = 0; i < records.length; i++) {
        this.patientNotifications[i].date = (new Date(this.patientNotifications[i].date));
      }
      if (records.length == 0) {
        this.patientNotifications = null;
      }
      console.log(this.patientNotifications);
    })
      .catch(err => {
        console.log(err);
      });

  }
  notificationGroup = new FormGroup({
    deviceName: new FormControl(''),
  });

  viewPatientEmergencyHistoryDetails(): void {
  }
  ngOnInit() {
  }

}
