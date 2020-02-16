import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBackendConnectionService } from 'src/app/services/user-backend-connection.service';
import { AuthenticationCredentials } from 'src/app/models/AuthenticationCredentials';
import { FormGroup, FormControl } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MessageService } from 'src/app/services/message-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  user: AuthenticationCredentials = {
    email: "stark@abc.com",
    password: "1234"
  }
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  private errorMessage = "";

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, private userBackendService: UserBackendConnectionService,
    private loginStatus: MessageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.storage.clear();
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
  onBackButtonClick(): void {
    this._router.navigate(['/signup'])
  }

  onLoginButtonClick(): void {
    this.storage.clear();
    this.user.email = this.profileForm.value.email;
    this.user.password = this.profileForm.value.password;
    // this.userBackendService.authenticate(this.user).then((res) => {
    //   this.loginStatus.changeMessage(true);
    //   console.log(res);
    //   this.storage.set(environment.USER, res);
    //   this._router.navigate(['/mode']);
    // }

    //TODO: SKIPPED AUTH
    this.userBackendService.getUserInfoByEmail(this.user.email).then((res) => {
      this.loginStatus.changeMessage(true);
      console.log(res);
      this.storage.set(environment.USER, res);
      this._router.navigate(['/fav-mobiles']);
    }
    ).catch((error: any) => {
      console.log(error);
      if (error.status == 403 || error.status == 404) {
        this.errorMessage = "Access Denied. Incorrect username/passsword.";
        this.loginStatus.changeMessage(false);
      }
      else {
        this.errorMessage = error.message;
      }
    });
  }


  ngOnInit() {
    this.loginStatus.changeMessage(false);
    // window.location.reload();
  }
}
