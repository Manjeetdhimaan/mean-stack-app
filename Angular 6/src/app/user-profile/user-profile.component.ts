import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log("res", res)
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onEditProfile() {
    this.router.navigate([`/edit/${this.userDetails['_id']}`]);
  }
}
