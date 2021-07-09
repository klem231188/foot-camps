import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, switchMap} from 'rxjs/operators';
import {Role} from '../../models/role.enum';
import {of} from 'rxjs';
import {UserService} from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth,
              private userService: UserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.angularFireAuth.authState
      .pipe(
        switchMap((firebaseUser) => {
          if (firebaseUser !== null && firebaseUser.uid !== null) {
            return this.userService.getUser(firebaseUser.uid)
          } else {
            return of(null);
          }
        }),
        map((user) => {
          if (user !== null) {
            switch (user.role) {
              case Role.ADMIN:
                return true;
              case Role.ORGANIZER:
                return true;
              case Role.USER:
                return this.router.createUrlTree(['/accueil']);
            }
          } else {
            return this.router.createUrlTree(['/accueil']);
          }
        })
      );
  }

}
