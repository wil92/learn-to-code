import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'learn-to-code-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  loginAction(): void {
    if (this.login.valid) {
      const username = this.login.get('username').value;
      const password = this.login.get('password').value;
      this.authService.login(username, password).subscribe(() => this.redirectToHome());
    }
  }

  registerAction(): void {
    const password = this.register.get('password').value;
    const password2 = this.register.get('password2').value;
    if (password === password2 && this.register.valid) {
      const username = this.register.get('username').value;
      const email = this.register.get('email').value;
      this.authService.register(username, password, email).subscribe(() => this.redirectToHome());
    }
  }

  redirectToHome() {
    this.router.navigate(['']);
  }
}
