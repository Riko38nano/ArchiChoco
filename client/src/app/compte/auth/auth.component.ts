import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {connexion, location} from "../../http/urlReseaux";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mail: ['', Validators.required],
      pass: ['', Validators.required]
    });
    console.log(location + connexion)
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.mail.value, this.f.pass.value)
      .pipe(first())
      .subscribe(
        data => {},
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
