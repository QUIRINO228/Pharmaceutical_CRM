import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {StorageService} from "../../storage/storage.service";


@Injectable({
  providedIn: "root"
})

export class noAuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (StorageService.hasToken() && StorageService.isUserLoggedIn()) {
      this.router.navigateByUrl("/worker/dashboard");
      return false;
    }
    if (StorageService.hasToken() && StorageService.isAdminLoggedIn()) {
      this.router.navigateByUrl("/admin/dashboard");
      return false;
    }
    if (StorageService.hasToken() && StorageService.isWorkerLoggedIn()) {
      this.router.navigateByUrl("/worker/dashboard");
      return false;
    }
    if (StorageService.hasToken() && StorageService.isManagerLoggedIn()) {
      this.router.navigateByUrl("/manager/dashboard");
      return false;
    }
    return true;
  }

}

