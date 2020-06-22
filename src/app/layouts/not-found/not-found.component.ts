// core
import {Component} from '@angular/core';
// utils
import {ROUTES} from '@shared/helpers/routes';

@Component({
  selector: 'td-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  TODO = ROUTES.TODO;

}
