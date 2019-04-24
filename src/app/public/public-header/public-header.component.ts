import { Component, OnInit } from '@angular/core';
import { Users } from '@app/_models/users.model';
import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {

  currentUser: Users;
  isLoading: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private router : Router
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    if (this.currentUser != null) {
      this.isLoading = true;
    }
  }
  logout() {
    this.authenticationService.logout();
    this.isLoading = false;
    this.router.navigate(['/public']);
  }

}
