import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  private IoTDevicesList = [];
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, private patientService: PatientService,
    @Inject(LOCAL_STORAGE) private storage: StorageService, ) {
  }

  addDeviceForm = new FormGroup({
    deviceName: new FormControl(''),
  });
  formInvalidStr = "";

  addNewIoTDevice(): void {
    if (this.addDeviceForm.valid) {
      var patientId = this.storage.get(environment.PATIENT).patientId;
      console.log(patientId);
      this.patientService.addNewIoTDevice(this.addDeviceForm.value.deviceName, patientId)
        .then(res => {
          console.log(res);
          this.formInvalidStr = "";
          this.ngOnInit();
        }).catch(err => {
          console.log(err);
          this._router.navigate(['/login']);
        })
    }
    else {
      this.formInvalidStr = "Please enter IoT device name.";
    }
  }

  removeIoTDevice(device) {
    console.log(device);
    var patientId = this.storage.get(environment.PATIENT).patientId;
    this.patientService.removeIoTDevice(patientId, device.sensorId).then(res => {
      console.log(res);
      this.ngOnInit();
    }).catch(err => {
      console.log(err);
      this._router.navigate(['/login']);
    })
  }
  ngOnInit() {
    var patientId = this.storage.get(environment.PATIENT).patientId;
    this.patientService.getIoTDevices(patientId).then(res => {
      this.IoTDevicesList = res;
      if (res != null) {
        for (var i = 0; i < res.length; i++) {
          var device = res[i];
          console.log(device.deviceName);
          console.log(device.aesKey);
        }
      }
    })
  }

}
