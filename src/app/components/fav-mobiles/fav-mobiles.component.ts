import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { FavMobilesService } from 'src/app/services/fav-mobiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fav-mobiles',
  templateUrl: './fav-mobiles.component.html',
  styleUrls: ['./fav-mobiles.component.css']
})
export class FavMobilesComponent implements OnInit {

  mobilesList: any = [];
  userDetails: any = null;
  isLoggedIn: any = false;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private favMobileService: FavMobilesService) { }


  ngOnInit() {
    this.userDetails = this.storage.get(environment.USER);
      if (this.userDetails != null) {
        this.isLoggedIn = true;

        this.favMobileService.getFavMobilesList(this.userDetails.userId).then(list => {
          this.mobilesList = list;
          console.log(this.mobilesList);
        });

      }
      else{
        this._router.navigate(["/login"]);
      }
  }

  removeFavMobile(relationId){
    this.favMobileService.removeFavMobile(relationId).then(res=>{
      this.ngOnInit();
    });
  }
}
