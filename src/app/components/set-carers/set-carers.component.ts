import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-set-carers',
  templateUrl: './set-carers.component.html',
  styleUrls: ['./set-carers.component.css']
})
export class SetCarersComponent implements OnInit {

  private carerList = [];
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, private patientService: PatientService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, ) {
  }

  addCarerForm = new FormGroup({
    carerId: new FormControl(''),
    relationship: new FormControl(''),
  });
  formInvalidStr = "";

  addNewCarerRelation(): void {
    if (this.addCarerForm.valid) {
      var patientId = this.storage.get(environment.PATIENT).patientId;

      console.log(patientId);
      this.patientService.addNewCarerRelationship(patientId, this.addCarerForm.value.carerId,
        this.addCarerForm.value.relationship)
        .then(res => {
          console.log(res);
          this.formInvalidStr = "";
          this.ngOnInit();
        }).catch(err => {
          console.log(err);
          if (err.status == 400) {
            this.formInvalidStr = "User relationship already exists or invalid ID!";
          }
          else{
            this._router.navigate(['/login']);
          }
        })
    }
    else {
      this.formInvalidStr = "Please enter all the details.";
    }
  }

  removeCarer(carer) {
    console.log(carer);
    var patientId = this.storage.get(environment.PATIENT).patientId;
    this.patientService.removeCarerRelationship(patientId, carer.carerId).then(res => {
      console.log(res);
      this.ngOnInit();
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/login']);
    })
  }
  ngOnInit() {
    var patientId = this.storage.get(environment.PATIENT).patientId;
    this.patientService.getCarerRelationships(patientId).then(res => {
      this.carerList = res;
      if (res != null) {
        for (var i = 0; i < res.length; i++) {
          var carer = res[i];
          console.log(carer);
        }
      }
    })
  }

}
