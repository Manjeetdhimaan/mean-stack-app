import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminAccountComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) { }

  serverErrorMessages: string;
  isLoading: boolean = false;
  model ={
    email :'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  ngOnInit() {
    const id = this.adminService.getUserPayload()?.['_id'];
    if(this.adminService.isLoggedIn()) {
      this.adminService.isAdmin = true;
      this.router.navigateByUrl(`/allusers`);
    }
   
  }

  onSubmit(form: NgForm){
    this.adminService.login(form.value).subscribe(
      res => {
        this.adminService.setToken(res['token']);
        this.router.navigateByUrl(`/allusers`);
      },
      err => {
        this.serverErrorMessages = err.error.message;
        setTimeout(() => {
          this.serverErrorMessages = null;
        }, 3000);
      }
    );
  }
}