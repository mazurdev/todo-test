import {Component, Input} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {HelperService} from '@shared/services/helper.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogContainerComponent} from '@features/dialog-container/dialog-container.component';

@Component({
  selector: 'td-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: string;
  @Input() isLogged: boolean;

  constructor(
    private authService: AuthService,
    private helperService: HelperService,
    private dialog: MatDialog
  ) {}

  addTodo() {
    this.dialog.open(DialogContainerComponent, {
      data: {
        action: 'create'
      }
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
