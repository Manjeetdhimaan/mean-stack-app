import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";
import { AdminService } from "../shared/admin.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService, private router : Router, private adminService : AdminService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            console.log(this.adminService.isAdmin)
            let clonedreq;
                if (this.adminService.isAdmin === false) {
                     clonedreq = req.clone({
                        headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
                    });
                }
                else {
                    clonedreq = req.clone({
                        headers: req.headers.set("Authorization", "Bearer " + this.adminService.getToken())
                    });
                }
            
            return next.handle(clonedreq).pipe(
                tap(
                    event => { },
                    err => {
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}
