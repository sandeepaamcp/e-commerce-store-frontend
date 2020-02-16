import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBackendConnectionService } from 'src/app/services/user-backend-connection.service';
import { AuthenticationCredentials } from 'src/app/models/AuthenticationCredentials';
import { FormGroup, FormControl } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { MessageService } from 'src/app/services/message-service.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userEmail: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  private errorMessage = "";

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router, private userBackendService: UserBackendConnectionService,
    private messageService: MessageService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.storage.clear();
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
  goToLogin(): void {
    this._router.navigate(['/login'])
  }

  onSignupButtonClick(): void {
    if (this.profileForm.value.password != this.profileForm.value.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
    }
    else if (this.profileForm.valid) {
      this.storage.clear();
      this.user.email = this.profileForm.value.userEmail;
      this.user.password = this.profileForm.value.password;
      this.user.phoneNumber = this.profileForm.value.phoneNumber;
      this.user.userName = this.profileForm.value.firstName + " " + this.profileForm.value.lastName;

      this.userBackendService.register(this.user).then((res) => {
        console.log(res);
        // this.messageService.changeMessage(res);
        // this.storage.set(environment.USER, res);
        this._router.navigate(['/login']);
      }
      ).catch((error: any) => {
        console.log(error);
        this.errorMessage = error.error.message;
      });
    }
    else {
      this.errorMessage = "Please fill all the fields.";
    }

  }

  ngOnInit() {
  }

}