import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    );
  };

export const canActivateGuardPublic: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return checkAuthStatus();
};

export const canMatchGuardPublic: CanMatchFn = ( //Tipado CanMatchFN
    route: Route,
    segments: UrlSegment[]
  ) => {
    return checkAuthStatus();
};

