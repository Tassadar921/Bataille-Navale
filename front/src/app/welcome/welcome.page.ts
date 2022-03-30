import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  private http: HttpService;

  constructor() {}

  async ngOnInit() {
    // await this.http.lastConnected();
  }

}
