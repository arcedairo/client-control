import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { ConfiguracionServicio } from "../servicios/configuracion.service";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

Injectable({
    providedIn: 'root'
})
export class ConfiguracionGuard implements CanActivate{
    constructor(
        private router: Router, 
        private configuracionServicio: ConfiguracionServicio
    ){}

    canActivate(): Observable<boolean> {
        return this.configuracionServicio.getConfiguracion().pipe(
                map(configuracion => {
                    if(configuracion.permitirRegistro){
                        return true;
                    }else{
                        this.router.navigate(['/login']);
                        return false;
                    }
                }

                )
        )
    }
    
}