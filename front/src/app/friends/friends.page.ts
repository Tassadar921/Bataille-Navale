import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {DemandsComponent} from './demands/demands.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})

export class FriendsPage implements OnInit {

  @ViewChild(DemandsComponent) demandsComponent: DemandsComponent;
  public numberInvits;
  public main = 0;
  public secondary = 0;

  constructor(
    public httpService: HttpService,
  ) {
  }

  async ngOnInit() {
    this.numberInvits = await this.httpService.getUserDemandsReceivedLength();
  }

  switchMain = (val) => {
    this.main = val;
  };

  switchSecondary = (val) => {
    this.secondary = val;
    if (this.secondary && this.main) {
      setTimeout(
        this.getNumberOfInvits,
        500);
    }
  };

  getNumberOfInvits = () => {
    if (this.secondary && this.main) {
      this.numberInvits = this.demandsComponent.demandsLength;
      this.switchSecondary(this.secondary);
    }
  };
}
