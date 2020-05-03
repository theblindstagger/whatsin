import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as hash from 'hash.js'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  token: string = null;

  constructor() { }

  public isTokenValid = (): boolean => {
    return this.token !== null;
  }

  public login = (username: string, password: string): Observable<boolean> => {
    const passwordHash = hash.sha256().update(password).digest("hex");

    this.token = "dummy.token";

    return of(true);
  }
}
