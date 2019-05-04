import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { Users } from '@app/_models/users.model';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.css']
})
export class DoctorHeaderComponent implements OnInit {
  currentUser: Users;
  avatarCheck :boolean=false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    if(this.currentUser.avatar!= null){
      this.avatarCheck = true;
    }
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/public']);
  }
}
