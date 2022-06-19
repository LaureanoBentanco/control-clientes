import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuht: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.afAuht.authState.pipe(
      map((auht) => {
        if (!auht) {
          this.router.navigate(['/login'])
          return false
        } else {
          return true
        }
      }),
    )
  }
}
