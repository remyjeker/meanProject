import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as PATHS from '../app-routing/routes';

@Component({
  selector: 'app-error-page',
  templateUrl: './errorPage.component.html',
  styleUrls: ['./errorPage.component.scss'],
  providers: [ RouterModule ],
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  public PATHS: any = PATHS;

  ngOnInit() { }

}
