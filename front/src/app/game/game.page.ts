import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {StorageService} from '../shared/services/storage.service';
import {ModalController} from '@ionic/angular';
import {DisconnectedComponent} from './disconnected/disconnected.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  public myMatrix = [];
  public ennemyMatrix = [];
  public race;
  public inGame = true;

  constructor(
    private getVarInURL: ActivatedRoute,
    private socket: Socket,
    public opMatrix: OpMatrixService,
    private storage: StorageService,
    private modalController: ModalController,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.socket.connect();
    this.ennemyMatrix = this.opMatrix.reinitMatrix();
    this.getVarInURL.queryParams.subscribe(params => {
      console.log('my infos : ', params);
      this.myMatrix = JSON.parse(params.matrix);
      this.race = params.race;
    });
    this.socket.emit('enterGame', {name: await this.storage.getNickname(), matrix: this.myMatrix, race: this.race});
    this.socket.on('beginGame', (data)=> {
      console.log('ennemy infos : ', data);
    });
    this.socket.on('crash', async ()=>{
      await this.crash();
    });
  }

  ngOnDestroy() {
    this.socket.emit('leaveGame', this.inGame);
  }

  async crash() {
    const modal = await this.modalController.create({
      component: DisconnectedComponent,
    });
    modal.onDidDismiss().then(() => {
      if(this.router.url.includes('/game')) {
        this.crash();
      }
    });
    await modal.present();
  }

}
