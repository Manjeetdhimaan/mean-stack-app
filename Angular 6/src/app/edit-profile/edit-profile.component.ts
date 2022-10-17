import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userDetails;
  editProfileForm: FormGroup;
  fullname: string;
  email: string;
  password: string = "";
  confirmPassword: string;
  isLoading: boolean = false;
  showSucessMessage: boolean = false;

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      fullname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    })

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.editProfileForm.patchValue({
          fullname: this.userDetails['fullName'],
          email: this.userDetails['email'],
          password: ''
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdateValues() {
    this.userService.updateUserProfile(this.editProfileForm.value).subscribe((res) => {
      this.showSucessMessage = true;
      setTimeout(() => this.router.navigate([`/userprofile/${this.userDetails['_id']}`]), 1000);
    },
      err => {
        console.log(err);
      })
  }

  onGetProfile() {
    this.router.navigate(['/login']);
  }

}