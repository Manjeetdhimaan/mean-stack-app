import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }
 
  adminProfile:any;
  ngOnInit(): void {
    this.adminService.getAdminProfile().subscribe(
      res => {
        this.adminProfile= res['user']
      },
      err => {
        console.log(err);
      }
    );

  }
  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/admin-login']);
  }
}
