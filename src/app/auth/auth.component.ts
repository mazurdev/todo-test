import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {UserInterface} from '@models/user.interface';

@Component({
  selector: 'td-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  login(authenticate: UserInterface): void {
    this.authService.login(authenticate).subscribe();
  }

}
