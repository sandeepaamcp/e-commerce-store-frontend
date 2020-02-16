import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';
import { IoTDevice } from '../models/IoTDevice';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  apiURL: string;
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }

  public addNewDonor(userId) {
    return this.http.post(`${this.apiURL}/donors/new-donor?userId=${userId}`,{}).pipe(
      map((res: any) => {
        this.storage.set(environment.DONOR, res);
      })
    ).toPromise();
  }

  public getDonorData(userId) {
    console.log(userId);
    return this.http.get(`${this.apiURL}/donors/get-by-user-id?userId=${userId}`).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    ).toPromise();
  }

  public removeDonor(donorId) {
    return this.http.post(`${this.apiURL}/donors/delete-donor?donorId=${donorId}`,{}).pipe(
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

  public addNewMobile(donorId) {
    return this.http.post(`${this.apiURL}/mobiles/add-new?donorId=${donorId}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public getMobiles(donorId) {

    return this.http.get(`${this.apiURL}/mobiles/get-registered-mobiles?donorId=${donorId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  public removeMobile(donorId, mobileId) {

    return this.http.post(`${this.apiURL}/mobiles/delete-mobile?donorId=${donorId}&mobileId=${mobileId}`,{})
      .pipe(
        map((res: any) => {
          return res;
        })
      ).toPromise();
  }
}
