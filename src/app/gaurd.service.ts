// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class GaurdService implements CanActivate{

//   constructor(private router: Router) { }

//   canActivate(router: ActivatedRouteSnapshot, state:RouterStateSnapshot){

//     if (localStorage.getItem('currentUser')){
//       //logged in
//       return true;
//     }
//     this.router.navigate(['/login'],{queryParams: {returnUrl: state.url}});
//     return false;
//   }
// }
