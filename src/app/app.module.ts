import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { EndmarketingComponent } from './components/endmarketing/endmarketing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { CalltoactionComponent } from './components/calltoaction/calltoaction.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './config.service';
import { LoginComponent } from './components/login/login.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SignupComponent } from './components/signup/signup.component';
import { ModeComponent } from './components/mode/mode.component';
import { PatientlogComponent } from './components/patientlog/patientlog.component';
import { CarerlogComponent } from './components/carerlog/carerlog.component';
import { DonorlogComponent } from './components/donorlog/donorlog.component';
import { PatientdataComponent } from './components/patientdata/patientdata.component';
import { CarerdataComponent } from './components/carerdata/carerdata.component';
import { DonordataComponent } from './components/donordata/donordata.component';
import { AddCarerComponent } from './components/add-carer/add-carer.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { RealDataComponent } from './components/real-data/real-data.component';
import { LocateComponent } from './components/locate/locate.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AuthInterceptor } from '../app/interceptors/AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from './services/message-service.service';
import { AuthGuard } from './auth/AuthGuard';
import { SetCarersComponent } from './components/set-carers/set-carers.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { HomeComponent } from './components/home/home.component';
import { MobileSpecComponent } from './components/mobile-spec/mobile-spec.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    EndmarketingComponent,
    TestimonialsComponent,
    PricingComponent,
    CalltoactionComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ContactusComponent,
    SignupComponent,
    ModeComponent,
    PatientlogComponent,
    CarerlogComponent,
    DonorlogComponent,
    PatientdataComponent,
    CarerdataComponent,
    DonordataComponent,
    AddCarerComponent,
    PatientProfileComponent,
    AddDeviceComponent,
    RealDataComponent,
    LocateComponent,
    SetCarersComponent,
    MedicalHistoryComponent,
    HomeComponent,
    MobileSpecComponent
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
  ],
  providers: [ConfigService, 
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    MessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
