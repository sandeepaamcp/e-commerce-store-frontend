import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationCredentials } from '../models/AuthenticationCredentials';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MobileSearchService {
  apiURL: string;
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }

  private userData: AuthenticationCredentials;



  public getMobileManufacturers(){
    return this.http.get(`${this.apiURL}/mobile_search/get_all_manufacturers`).toPromise();
  }


  getSearchListFromFilters(selectedManufacturer: any, price: any, selectedVariation: any) {
    var query = "/mobile_search/get_mobiles_by_manufactuer_and_price?manufacturer="+
    selectedManufacturer+"&price="+price+"&variation="+selectedVariation;
    return this.http.get(`${this.apiURL}`+query).toPromise();
  }



  public authenticate(credentials: AuthenticationCredentials) {
    this.userData = credentials;
    return this.http.post(`${this.apiURL}/authenticate`, credentials).pipe(
      map((res: any) => {
        console.log(res);
        if (res.jwt != null) {
          this.storage.set(environment.AUTH_KEY, res.jwt);
          return this.getUserInfoByEmail(this.userData.email).toPromise();
          // this._router.navigate(['/patientdata']);
          // this.userBackendService.getUserInfoByEmail().subscribe((res: any) => {
          //     console.log(res);
          // });
          // var values$ = forkJoin(
          //   this.userBackendService.getUserInfoByEmail(),
          //   // getSingleValueObservable(),
          //   // getDelayedValueObservable()
          //   // getMultiValueObservable(), forkJoin on works for observables that complete
          // ).pipe(
          //   map(([first]) => {
          //     console.log(first);
          //     // forkJoin returns an array of values, here we map those values to an object
          //     return { first };
          //   })
          // );
        }
        else {
          throw new HttpErrorResponse({
            error: 'JWTTokenError',
            headers: res.headers,
            status: 500,
            statusText: 'JWT token not found',
            url: res.url
          });
        }
      })
    ).toPromise();
    // if (res != null) {
    //   if (res.jwt != null) {
    //   //   const currentTodoList = this.storage.get(environment.AUTH_KEY) || [];
    //   //   this.storage.set(environment.AUTH_KEY,res.jwt);
    //   //   // push new task to array
    //   //   currentTodoList.push({
    //   //     title: res.jwt,
    //   //     isChecked: false 
    //   // });
    //   // // insert updated array to local storage
    //   // this.storage.set(environment.AUTH_KEY, currentTodoList);
    //   // console.log(this.storage.get(environment.AUTH_KEY) || 'LocaL storage is empty');
    //   }
    // }

    // console.log(this.storage.get(environment.AUTH_KEY));
    // return res;
  }

  public register(userDetails) {
    return this.http.post(`${this.apiURL}/users/signup`, userDetails).pipe(
      map((res: any) => {
        console.log(res);
      })
    ).toPromise();
  }



  public logout() {
    var token = this.storage.get(environment.AUTH_KEY);
    if (token != null) {
      this.storage.remove(environment.AUTH_KEY);
    }
  }

  public getUserToken(): string {
    return this.storage.get(environment.AUTH_KEY);
  }


  public getUserInfoByEmail(email: string) {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Authorization', 'Bearer '+this.getUserToken());
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': this.getUserToken()
    // })
    return this.http.get(`${this.apiURL}/users/get-by-email?email=${email}`);
  }

  public isUserLoggedIn() {
    if (this.storage.has(environment.AUTH_KEY)) {
      return true;
    }
    return false;
  }

  public getSavedUser() {
    return this.storage.get(environment.USER);
  }
}
