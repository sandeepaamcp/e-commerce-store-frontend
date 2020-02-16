import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './config.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AuthInterceptor } from '../app/interceptors/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/AuthGuard';
import { HomeComponent } from './components/home/home.component';
import { MobileSpecComponent } from './components/mobile-spec/mobile-spec.component';
import { FavMobilesComponent } from './components/fav-mobiles/fav-mobiles.component';
import { MessageService } from './services/message-service.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MobileSpecComponent,
    FavMobilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZi5qakYpNfEganwdP1vK2F1AhnsS-e4U'
    }),
    HttpClientModule,
    ChartsModule,
    StorageServiceModule,
    FormsModule,
  ],
  providers: [ConfigService, 
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
