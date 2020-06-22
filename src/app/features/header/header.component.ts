import {Component, Input, OnInit} from '@angular/core';

import {AuthService} from '@shared/services/auth.service';
import {DataService} from '@shared/services/data.service';
import {HelperService} from '@shared/services/helper.service';

@Component({
  selector: 'td-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() isLogged: boolean;

  constructor(
    private authService: AuthService,
    private helperService: HelperService
  ) {
  }

  ngOnInit() {
  }

  addTodo() {
    // this.helperService.openDialogContainer();
  }

  logOut() {
    this.authService.logOut();
  }
}
