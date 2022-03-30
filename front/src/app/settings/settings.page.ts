import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private http: HttpService;

  constructor() { }

  async ngOnInit() {
    // await this.http.lastConnected();
  }

}
