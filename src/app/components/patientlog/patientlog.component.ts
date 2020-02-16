import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/Patient';
import { UserBackendConnectionService } from 'src/app/services/user-backend-connection.service';

@Component({
  selector: 'app-patientlog',
  templateUrl: './patientlog.component.html',
  styleUrls: ['./patientlog.component.css']
})
export class PatientlogComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, private patientService: PatientService,
    private userService: UserBackendConnectionService) { }

  private invalidFormText = "";

  patientlogForm = new FormGroup({
    height: new FormControl('', [Validators.required,
    Validators.maxLength(3),
    Validators.minLength(2)]),
    weight: new FormControl(''),
    DOB: new FormControl(''),
    gender: new FormControl(''),

  });



  onBackButtonClick(): void {
    console.log(this.patientlogForm.value);
    if (this.patientlogForm.status == "VALID") {
      this.invalidFormText = "";
      console.log("valid");
      var patient: Patient = new Patient();

      patient.height = this.patientlogForm.value.height;
      patient.weight = this.patientlogForm.value.weight;
      patient.birthDate = this.patientlogForm.value.DOB;
      patient.sex = this.patientlogForm.value.gender;

      var user = this.userService.getSavedUser();
      if (user == null) {
        this._router.navigate(['/login']);
      }
      else {
        this.patientService.addNewPatient(patient, user.userId).then(() => {
          this._router.navigate(['/mode']);
        }).catch((err) => {
          console.log(err);
          this._router.navigate(['/login']);
        });

      }
    }
    else {
      this.invalidFormText = "Please fill out all the fields.";
    }
  }

  ngOnInit() {
  }
  // validated(): boolean {
  //   var userData = this.patientlogForm.value;
  //   if (userData.height == "" || userData.weight == "" || userData.DOB == "" || userData.gender == "") {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

}
