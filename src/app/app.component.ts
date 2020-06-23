import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ROUTES} from '@shared/helpers/routes';

@Component({
  selector: 'td-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate([ROUTES.TODO]);
    }
  }

}
