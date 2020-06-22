import {Component} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthDateInterface} from '@models/auth-date.interface';
import {HelperService} from '@shared/services/helper.service';
import {Router} from '@angular/router';
import {ROUTES} from '@shared/helpers/routes';

@Component({
  selector: 'td-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  logInForm: FormGroup;
  validationMessages = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters long.'}
    ]
  };

  constructor(
    private authService: AuthService,
    private helperService: HelperService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.logInForm = fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  onSubmit(authData: AuthDateInterface) {
    if (!this.logInForm.valid) {
      return;
    }
    this.authService.login(authData).subscribe(() => {
    }, e => {
      this.helperService.showSnackBar(e.error);
    }, () => {
      this.logInForm.reset();
      this.router.navigate([ROUTES.TODO]);
    });
  }

}
