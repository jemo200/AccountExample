import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-gst-login',
  templateUrl: './gst-login.component.html',
  styleUrls: ['./gst-login.component.css']
})
export class GstLoginComponent implements OnInit {

  angForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public location: Location
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  login(email, password) {
    this.authService.login(email, password).subscribe((data: {authenticated: boolean, message: string}) => {
      this.authService.message = data.message;
      if (data.authenticated) {
        this.authService.isLoggedIn = true;
      } else {
        this.authService.isLoggedIn = false;
      }
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        // const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        // Redirect the user
        // this.router.navigate(['']);
        window.location.href = '/admin';
      }
    }, error => {
    });
  }

  logout() {
    this.authService.logout();
  }

}
