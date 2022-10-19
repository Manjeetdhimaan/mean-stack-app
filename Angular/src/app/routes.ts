import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminAccountComponent } from './admin/admin-account/admin-account.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminAuthGuard } from './admin-auth/admin-auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'edit', component: EditProfileComponent,canActivate:[AuthGuard]
    },

    {
        path: 'admin-login', component: AdminAccountComponent,
        
    },
    {
        path: 'allusers', component: AllUsersComponent,canActivate:[AdminAuthGuard]
        
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];