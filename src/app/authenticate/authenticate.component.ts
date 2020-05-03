import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router) { }

  ngOnInit(): void {
  }

  canLogin = (): boolean => {
    return <boolean><unknown>(this.username && this.password);
  }

  login = (): void => {
    this.authenticateService.login(this.username, this.password).subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.router.navigate(["/"]);
      }
    });
  }
}
