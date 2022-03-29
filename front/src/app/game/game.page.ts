import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {StorageService} from '../shared/services/storage.service';
import {ModalController, ViewWillEnter} from '@ionic/angular';
import {DisconnectedComponent} from './disconnected/disconnected.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, ViewWillEnter {

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

  ngOnInit() {}

  ionViewWillEnter() {
    let token;
    this.getVarInURL.queryParams.subscribe(params => {
      token = params.token;
    });
    this.socket.emit('enterGame', token);
    this.socket.emit('createRoom', '/////////////////////////////////////////////////////');
    this.socket.on('destroy', () => {
      console.log('destroyed');
      this.router.navigateByUrl('/room');
    });
    this.socket.emit('test', this.race);
  }

}
