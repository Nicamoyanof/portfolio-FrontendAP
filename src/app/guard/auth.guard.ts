import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { LoginService } from '../service/login.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Promise<boolean> {
    let token = jwt_decode(localStorage.getItem('auth_token'));

    return new Promise<boolean>((resolve) => {
      try {
        let JSONToken = JSON.parse(JSON.stringify(token));
        this.loginService.usuarioAcceso().subscribe((resp) => {
          if (resp == 'OK') {
            resolve(true);
          } else {
            localStorage.removeItem('auth_token');
            this.router.navigate(['login']);
            resolve(false);
          }
        });
      } catch (error) {
        localStorage.removeItem('auth_token');
        this.router.navigate(['login']);
        resolve(false);
      }
    });
  }
}
