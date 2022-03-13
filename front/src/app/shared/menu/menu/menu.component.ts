import {Component, OnInit} from '@angular/core';
import {GlobalVarsService} from '../../services/global-vars.service';
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
    public glob: GlobalVarsService,
    private router: Router,
  ) {
    setInterval(this.refreshTime, 2000);
    this.name = this.glob.getNickname();
  }

  ngOnInit() {
    this.refreshTime();
    if(!this.glob.getNickname()){
      this.redirect('home');
    }
  }

  redirect = (direction) => {
    if (direction === 'home') {
      this.glob.setNickname('');
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
