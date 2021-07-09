import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.angularFireAuth.authState
      .pipe(
        map((firebaseUser) => {
          if (firebaseUser !== null && firebaseUser.uid !== null) {
            console.log('Guard: logged in !');
            console.log(firebaseUser);
            return true;
          } else {
            console.log('Guard: not logged in !');
            return this.router.createUrlTree(['/login']);
          }
        })
      );
  }

}
