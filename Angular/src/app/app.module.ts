// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AdminService } from './shared/admin.service';
import { AdminAuthGuard } from './admin-auth/admin-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    EditProfileComponent,
    AllUsersComponent,
    AdminComponent,
    AdminAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ,AuthGuard,AdminAuthGuard,UserService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
