import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';
import { IoTDevice } from '../models/IoTDevice';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiURL: string;
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }
  private userData;

  public addNewPatient(patientData, userId) {
    return this.http.post(`${this.apiURL}/patients/add-new-patient?userId=${userId}`, patientData).pipe(
      map((res: any) => {
        this.storage.set(environment.PATIENT, res);
      })
    ).toPromise();
  }

  public getPatientData(userId) {
    console.log(userId);
    return this.http.get(`${this.apiURL}/patients/get-by-user-id?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public removePatient(patientId) {
    return this.http.get(`${this.apiURL}/patients/delete-patient?patientId=${patientId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
    //TODO: CHECK CORS ISSUE WHY DELETE IS NOT WORKING
    // var headers = new HttpHeaders({'Content-Type':'application/json'});
    // return this.http.delete(`${this.apiURL}/patients/delete-patient/${patientId}`, { headers: headers }).pipe(
    //   map((res: any) => {
    //     return res;
    //   })
    // ).toPromise();
  }

  public addNewIoTDevice(deviceName, patientId) {
    console.log(deviceName);
    var iotDevice = new IoTDevice();
    iotDevice.deviceName = deviceName;
    return this.http.post(`${this.apiURL}/patients/add-iot-device?patientId=${patientId}`, iotDevice).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public getIoTDevices(patientId) {

    return this.http.get(`${this.apiURL}/patients/get-iot-devices?patientId=${patientId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public removeIoTDevice(patientId, deviceId) {

    return this.http.get(`${this.apiURL}/patients/remove-iot-device?patientId=${patientId}&sensorId=${deviceId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      ).toPromise();
  }

  public addNewCarerRelationship(patientId, carerId, relationship) {
    return this.http.post(`${this.apiURL}/patient-carer/new-relationship?patientId=${patientId}&carerId=${carerId}`,
      { relationship: relationship }).pipe(
        map((res: any) => {
          return res;
        })
      ).toPromise();
  }

  public getCarerRelationships(patientId) {

    return this.http.get(`${this.apiURL}/patient-carer/get-relationship-by-patient-id?patientId=${patientId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public removeCarerRelationship(patientId, carerId) {

    return this.http.post(`${this.apiURL}/patient-carer/delete-relationship?patientId=${patientId}&carerId=${carerId}`, {})
      .pipe(
        map((res: any) => {
          return res;
        })
      ).toPromise();
  }

  public getPatientNotifications(patientId){
    return this.http.get(`${this.apiURL}/alerts/get-alerts-by-patient-id?patientId=${patientId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      ).toPromise();
  }
}
