import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './auth/AuthGuard';
import { HomeComponent } from './components/home/home.component';
import { FavMobilesComponent} from './components/fav-mobiles/fav-mobiles.component';


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'header', component:HeaderComponent},
  { path: 'fav-mobiles', component: FavMobilesComponent,  canActivate: [AuthGuard]},
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
