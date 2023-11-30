import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  getPhotoPath(photoNumber
                   :
                   number
  ):
      string {
    return `/assets/images/photo${photoNumber}.jpg`;
  }

}


