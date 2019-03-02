import { Injectable } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { LoginService } from './api/login.service';
import { Router, CanActivate, CanActivateChild,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private loginService: LoginService,
        private userInfoService: UserInfoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
        let url: string = state.url;
        return this.checkLogin(url,route) ;
        //return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
      
        return this.canActivate(route, state) 
    }

    checkLogin(url: string,route: ActivatedRouteSnapshot): boolean {
        const user = this.userInfoService.getUserInfo()
        const expectedRoles :any[] = route.data.expectedRoles
        if (this.userInfoService.isLoggedIn() && this.matchRole(expectedRoles,user.roles)) {
            return true;
        }
        console.log("User is not logged or not having access rights- This routing guard prvents redirection to any routes that needs logging.");
        //Store the original url in login service and then redirect to login page
        console.log("The url "+ url + " needs roles : "+JSON.stringify(expectedRoles)+' connected user has : '+JSON.stringify(user.roles));
        
        this.loginService.landingPage = url;
       // console.log("next landingPage is : ",url);
        this.router.navigate(['/auth',]);
        return false;
    }

    private matchRole(expectedRoles :string [],  roles : string [] ){
       // console.log(expectedRoles)
       // console.log(roles)
        let  intersection = []
        roles.filter(element => {
                if(expectedRoles.indexOf(element) != -1){
                    intersection.push(element)
                }
            });
       /* console.log(expectedRole.indexOf(role) )
        return expectedRole.indexOf(role) > -1 */
        return  expectedRoles.length == 0 || intersection.length >0 
    
      }
}
