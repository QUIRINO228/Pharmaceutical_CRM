import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {StorageService} from "../../storage/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: "root"
})

export class UserGuard implements CanActivate {

  constructor(private router: Router,
              private snackbar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (StorageService.isWorkerLoggedIn()){
      this.router.navigateByUrl("/worker/dashboard");
      this.snackbar.open("You dont have access to this page", "Close",{duration: 5000})
      return false;
    }
    if (StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard");
      this.snackbar.open("You dont have access to this page", "Close",{duration: 5000})
      return false;
    }
    if (StorageService.isManagerLoggedIn()){
      this.router.navigateByUrl("/manager/dashboard");
      this.snackbar.open("You dont have access to this page", "Close",{duration: 5000})
      return false;
    }
    else if(!StorageService.hasToken()){
      StorageService.logout()
      this.router.navigateByUrl("/login");
      this.snackbar.open("You are not loggedIn", "Close",{duration: 5000})
      return false;
    }
    return true;
  }

}
