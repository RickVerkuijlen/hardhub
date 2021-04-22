import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import jwt_decode  from 'jwt-decode';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
        super(router, keycloakAngular);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) {
        // Force the user to log in if currently unauthenticated.
        if (!this.authenticated) {
          await this.keycloakAngular.login({
            redirectUri: window.location.origin + state.url,
          });
        }
        let temp = await this.keycloakAngular.getToken();
        console.log(temp);
        var decoded: any = jwt_decode(temp);
        console.log(decoded);

        const user: User = {
          uuid: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          jwt: temp
        }
        localStorage.setItem('user', JSON.stringify(user));
    
        // Get the roles required from the route.
        const requiredRoles = route.data.roles;
    
        // Allow the user to to proceed if no additional roles are required to access the route.
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
          return true;
        }
    
        // Allow the user to proceed if all the required roles are present.
        return requiredRoles.every((role) => this.roles.includes(role));
      }
}