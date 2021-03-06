import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationCredentials } from '../models/AuthenticationCredentials';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserBackendConnectionService {
  apiURL: string;
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }

  private userData: AuthenticationCredentials;

  public authenticate(credentials: AuthenticationCredentials) {
    this.userData = credentials;
    return this.http.post(`${this.apiURL}/authenticate`, credentials).pipe(
      map((res: any) => {
        console.log(res);
        if (res.jwt != null) {
          this.storage.set(environment.AUTH_KEY, res.jwt);
          return this.getUserInfoByEmail(this.userData.email);
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
    console.log(userDetails);
    return this.http.post(`${this.apiURL}/user/signup`, userDetails).pipe(
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
    return this.http.get(`${this.apiURL}/user/get_by_email?email=${email}`).toPromise();
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
