import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { EndmarketingComponent } from './components/endmarketing/endmarketing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { PatientlogComponent } from './components/patientlog/patientlog.component';
import { DonorlogComponent } from './components/donorlog/donorlog.component';
import { CarerlogComponent } from './components/carerlog/carerlog.component';
import { PatientdataComponent } from './components/patientdata/patientdata.component';
import { CarerdataComponent } from './components/carerdata/carerdata.component';
import { DonordataComponent } from './components/donordata/donordata.component';
import { ModeComponent } from './components/mode/mode.component';
import { AddCarerComponent } from './components/add-carer/add-carer.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { RealDataComponent } from './components/real-data/real-data.component';
import { HeaderComponent } from './components/header/header.component';
import { LocateComponent } from './components/locate/locate.component';
import { AuthGuard } from './auth/AuthGuard';
import{SetCarersComponent} from './components/set-carers/set-carers.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'patientlog', component: PatientlogComponent , canActivate: [AuthGuard]},
  { path: 'donorlog', component: DonorlogComponent ,  canActivate: [AuthGuard]},
  { path: 'carerlog', component: CarerlogComponent ,  canActivate: [AuthGuard]},
  { path: 'patientdata', component: PatientdataComponent,  canActivate: [AuthGuard] },
  { path: 'carerdata', component: CarerdataComponent,  canActivate: [AuthGuard] },
  { path: 'donordata', component: DonordataComponent,  canActivate: [AuthGuard] },
  { path: 'mode', component: ModeComponent,  canActivate: [AuthGuard] },
  { path: 'Features', component: EndmarketingComponent },
  { path: 'Testimonials', component: TestimonialsComponent },
  { path: 'Pricing', component: PricingComponent }, 
  { path: 'add-carer', component: AddCarerComponent,  canActivate: [AuthGuard]},
  { path: 'patientprofile', component: PatientProfileComponent,  canActivate: [AuthGuard]}, 
  { path: 'add-device', component: AddDeviceComponent,  canActivate: [AuthGuard]},
  { path: 'real-data', component: RealDataComponent,  canActivate: [AuthGuard]},
  { path: 'header', component:HeaderComponent},
  { path: 'locate', component:LocateComponent,  canActivate: [AuthGuard]},
  { path: 'set-carers', component: SetCarersComponent,  canActivate: [AuthGuard]},
  { path: 'medical-history', component: MedicalHistoryComponent,  canActivate: [AuthGuard]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
