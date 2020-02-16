import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarerService {
  apiURL: string;

  getCarerData(userId: any) {
    console.log(userId);
    return this.http.get(`${this.apiURL}/carers/get-by-user-id?userId=${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    ).toPromise();
  }

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }

  public addNewCarer(userId) {
    return this.http.post(`${this.apiURL}/carers/add-new-carer?userId=${userId}`,{}).pipe(
      map((res: any) => {
        this.storage.set(environment.PATIENT, res);
      })
    ).toPromise();
  }

  public removeCarer(carerId) {
    return this.http.post(`${this.apiURL}/carers/remove-carer?carerId=${carerId}`,{}).pipe(
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

  public getCarerRelationships(carerId) {

    return this.http.get(`${this.apiURL}/patient-carer/get-relationship-by-carer-id?carerId=${carerId}`).pipe(
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

}
