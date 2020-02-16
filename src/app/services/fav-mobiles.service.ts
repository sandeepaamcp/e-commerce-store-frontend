import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationCredentials } from '../models/AuthenticationCredentials';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class FavMobilesService {

  apiURL: string;
  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.apiURL = environment.CONNECTION_URL;
  }

  private userData: AuthenticationCredentials;

  public addNewFavMobile(userId, mobileSpecificationId){
    console.log("fav");
    return this.http.post(`${this.apiURL}/user_fav_mobiles/add_new?mobileSpecificationId=`+
    mobileSpecificationId+"&userId="+userId,{}).toPromise();
  }


  public getFavMobilesList(userId){
    return this.http.get(`${this.apiURL}/user_fav_mobiles/get_fav_mobiles_of_user?userId=`+
    userId).toPromise();
  }

  public removeFavMobile(mobileRelationId){
    return this.http.post(`${this.apiURL}/user_fav_mobiles/remove_relation?favMobileRelationId=`+
    mobileRelationId,{}).toPromise();
  }


  // public searchByKeyword(keyword){
  //   return this.http.get(`${this.apiURL}/mobile_search/get_mobiles_by_keyword?keyword=`+keyword)
  //   .toPromise();
  // }

  // public getSearchListFromFilters(selectedManufacturer: any, price: any, selectedVariation: any) {
  //   var query = "/mobile_search/get_mobiles_by_manufactuer_and_price?manufacturer="+
  //   selectedManufacturer+"&price="+price+"&variation="+selectedVariation;
  //   return this.http.get(`${this.apiURL}`+query).toPromise();
  // }
}