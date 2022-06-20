import {CanActivate, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConfiguracionServicio } from '../servicios/configuracion.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()

export class ConfiguaracionGuard implements CanActivate{
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private configuaracionServicio: ConfiguracionServicio
    ){}
    canActivate():Observable<boolean>{
      return this.configuaracionServicio.getConfiguracion().pipe(
        map(
          configuracion =>{
            if(configuracion.permitirRegistro){
                return true;
            }else{
              this.router.navigate(['/login'])
              return false;
            }
          }
        )
      )
    }
}
