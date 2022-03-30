import { Component, OnInit } from '@angular/core';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
})
export class ScoreboardPage implements OnInit {

  public scoreboard = [];

  constructor(
    private http: HttpService,
  ) { }

  async ngOnInit() {
    this.scoreboard = await this.http.getScoreboard();
    await this.http.lastConnected();
  }

}
