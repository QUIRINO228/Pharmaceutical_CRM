import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {StorageService} from "./services/storage/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';

  isAdminLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;
  isManagerLoggedIn: boolean = false;
  isWorkerLoggedIn: boolean = false;


  constructor(private router: Router) {
  }

  ngOnInit() {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationEnd){
        this.updateUserLoggedStatus();
      }
    })
  }

  private updateUserLoggedStatus(): void{
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn()
    this.isUserLoggedIn = StorageService.isUserLoggedIn()
    this.isManagerLoggedIn = StorageService.isManagerLoggedIn()
    this.isWorkerLoggedIn = StorageService.isWorkerLoggedIn()
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login")
  }

}
