import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth
    ){}

    canActivate(): Observable<boolean>{
        return this.angularFireAuth.authState.pipe(
            map(auth => {
                if(!auth){
                    this.router.navigate(['/login']);
                    return false;
                }else{
                    return true;
                }
            })
        )
    }
}