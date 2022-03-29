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

  public myName;
  public myMatrix = [];
  public myRace;
  public ennemyName;
  public ennemyMatrix = [];
  public ennemyRace;

  constructor(
    private getVarInURL: ActivatedRoute,
    public socket: Socket,
    public opMatrix: OpMatrixService,
    private storage: StorageService,
    private modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.myMatrix = this.opMatrix.reinitMatrix();
    this.ennemyMatrix = this.opMatrix.reinitMatrix();
  }

  ionViewWillEnter() {
    this.getVarInURL.queryParams.subscribe(params => {
      this.socket.emit('enterGame', params.token);
    });

    this.socket.emit('createRoom');
    this.socket.on('destroy', () => {
      this.router.navigateByUrl('/room');
    });
    this.socket.on('initGame', async (data) => {
      this.myName = await this.storage.getNickname();
      this.myRace = data.myRace;
      this.myMatrix = data.myMatrix;
      this.ennemyMatrix = this.opMatrix.reinitMatrix();
      this.ennemyName = data.ennemyName;
      this.ennemyRace = data.ennemyRace;
    });
  }

}
