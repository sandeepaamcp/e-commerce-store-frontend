import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activetab = 'home';

  private isLoggedIn = false;
  private userDetails;


  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private messageService: MessageService) {
  }

  onBackButtonClick(): void {
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    this.messageService.currentMessage.subscribe(isLoggedIn => {
      // console.log(isLoggedIn);
      this.isLoggedIn = isLoggedIn;

      this.userDetails = this.storage.get(environment.USER);
      if (this.userDetails != null) {
        this.isLoggedIn = true;
        // this._router.navigate(['/login']);
      }
    });
  }

  private loginAndLogout() {
    this.storage.clear();
    this.ngOnInit();
    this._router.navigate(['/login']);

  }

  private goToHome(){
    if(this.isLoggedIn){
      this._router.navigate(['/mode']);
    }
    else{
      this._router.navigate(["/Home"]);
    }
  }

  getActiveTab(tabname) {
    this.activetab = tabname;
  }
}


