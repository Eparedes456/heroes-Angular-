import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private authService: AuthService,private router : Router){}

  onLogin():void{
    this.authService.login('erickparedes4562gmail.com','524332').subscribe(
      user => {
        this.router.navigate(['/']);
      }
    );
  }

}
