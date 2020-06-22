import {Component} from '@angular/core';

@Component({
  selector: 'td-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-test';
}
