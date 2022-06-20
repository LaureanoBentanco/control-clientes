import {CanActivate} from '@angular/router';

export class ConfiguaracionGuard implements CanActivate{
    constructor(
        private router: Router
    ){}
}