import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  selectedAdmin: Admin = {
    fullName: '',
    email: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  AuthHeader = { headers: new HttpHeaders({
    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRjZWU2YWMxZTYzOWYwYzc3MGU4MTUiLCJpYXQiOjE2NjYxNjE5NTMsImV4cCI6MTY2NjE2MjAxM30.fP6RFNrxESxDKceIgBEnl-vyvCfmZnZOiUEx4d9mGCs}'
  }) }

 
   
  constructor(private http: HttpClient) { }

  //HttpMethods
  isAdmin: boolean = false;

  postUser(user: Admin){
    return this.http.post(environment.apiBaseUrl+'/admin/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    this.isAdmin = true;
    return this.http.post(environment.apiBaseUrl + '/admin/authenticate', authCredentials,this.noAuthHeader);
  }

  updateUserProfile(userBody) {
    return this.http.put(environment.apiBaseUrl + '/admin/updateUserProfile', userBody);
  }

  getAdminProfile() {
    this.isAdmin = true;
    return this.http.get(environment.apiBaseUrl + '/admin/adminProfile');
  }

  getUsers() {
    return this.http.get(environment.apiBaseUrl + '/admin/getUsers');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('admin-token', token);
  }

  getToken() {
    return localStorage.getItem('admin-token');
  }

  deleteToken() {
    this.isAdmin = false;
    localStorage.removeItem('admin-token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      console.log(JSON.parse(userPayload))
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
