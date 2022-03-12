import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalVarsService} from '../home/shared/service/global-vars.service';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public today;
  public hour;
  public exists = 0;

  constructor(
    private router: Router,
    public glob: GlobalVarsService,
    public loadingController: LoadingController,
  ) {
    setInterval(this.refreshTime, 2000);
  }

  ngOnInit() {
    if(this.glob.getConnected()===false){
      this.router.navigateByUrl('/home');
    }
  }
  switch = (val) => { this.exists = val;
  };

  refreshTime=() =>{
    if(moment().format('h:mm:ss a').includes('pm')){
      let cut;
      for(let i = 0; i<moment().format('h:mm:ss a').length;i++){
        if(moment().format('h:mm:ss a')[i]===':'){
          cut = i;
          i=moment().format('h:mm:ss a').length;
        }
      }
      if(moment().format('h:mm:ss a')[0]==='1' && moment().format('h:mm:ss a')[1]==='2'){
        this.hour = ('0' + moment().format('h:mm:ss a').slice(cut, moment().format('h:mm:ss a').length-6));
      }else{
        this.hour = (Number(moment().format('h:mm:ss a').slice(0,cut))+12)
          .toString()+moment().format('h:mm:ss a')
          .slice(cut, moment().format('h:mm:ss a').length-6);
      }
    }else{
      this.hour = moment().format('h:mm:ss a')
        .slice(0, moment().format('h:mm:ss a').length-6);
    }
  };

  redirect = (direction) =>{
    if(direction==='home') {
      this.glob.setNickname('');
      this.glob.switchConnected();
    }
    this.router.navigateByUrl('/' + direction);
  };

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'En recherche de joueur, en attente',
      duration: 2000  //a remplacer par un until found player
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('le match va débuter');
  }

}
