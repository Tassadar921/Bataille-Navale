import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public hour;
  public name;

  constructor(
    public storage: StorageService,
    private router: Router,
  ) {
    setInterval(this.refreshTime, 2000);
  }

  async ngOnInit() {
    this.refreshTime();
    if(!await this.storage.getNickname()){
      this.redirect('home');
    }else {
      this.name = await this.storage.getNickname();
    }
  }

  redirect = (direction) => {
    if (direction === 'home') {
      this.storage.setNickname('');
    }
    this.router.navigateByUrl('/' + direction);
  };

  refreshTime = () => {
    if (moment().format('h:mm:ss a').includes('pm')) {
      let cut;
      for (let i = 0; i < moment().format('h:mm:ss a').length; i++) {
        if (moment().format('h:mm:ss a')[i] === ':') {
          cut = i;
          i = moment().format('h:mm:ss a').length;
        }
      }
      this.hour = (Number(moment().format('h:mm:ss a').slice(0, cut)) + 12)
        .toString() + moment().format('h:mm:ss a')
        .slice(cut, moment().format('h:mm:ss a').length - 6);
      if (this.hour[0] === '2' && this.hour[1] === '4') {
        this.hour = '12' + this.hour.slice(2, this.hour.length);
      }
    } else {
      this.hour = moment().format('h:mm:ss a')
        .slice(0, moment().format('h:mm:ss a').length - 6);
      if (this.hour[0] === '1' && this.hour[1] === '2') {
        this.hour = '00' + this.hour.slice(2, this.hour.length);
      }
    }
  };

}
