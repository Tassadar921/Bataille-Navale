import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {StorageService} from '../shared/services/storage.service';
import {ModalController, ViewWillEnter} from '@ionic/angular';
import {DisconnectedComponent} from './disconnected/disconnected.component';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, ViewWillEnter {

  public myName;
  public myMatrix = [];
  public myRace;
  public myWeapons;
  public myCount = [];
  public ennemyName;
  public ennemyMatrix = [];
  public ennemyRace;
  public ennemyWeapons;
  public ennemyCount = [];
  public isMyTurn;

  constructor(
    private getVarInURL: ActivatedRoute,
    public socket: Socket,
    public opMatrix: OpMatrixService,
    private storage: StorageService,
    private modalController: ModalController,
    private router: Router,
    private http: HttpService,
  ) { }

  async ngOnInit() {
    this.myMatrix = this.opMatrix.reinitMatrix();
    this.ennemyMatrix = this.opMatrix.reinitMatrix();
    // await this.http.lastConnected();
  }

  async ionViewWillEnter() {
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
      this.isMyTurn = data.myTurn;
      this.myWeapons = data.myWeapons;
      this.ennemyWeapons = data.ennemyWeapons;
      this.myCount = await this.http.initCountMyShips(this.myMatrix);
    });
    this.socket.on('update', async (data) => {
      this.myMatrix = data.myMatrix;
      this.ennemyMatrix = data.ennemyMatrix;
      this.isMyTurn = data.myTurn;
      this.myWeapons = data.myWeapons;
      this.ennemyWeapons = data.ennemyWeapons;
    });
  }

  dropInMatrix = (data, x, y, me: boolean) => {
    console.log('dropped');
      data={line: this.opMatrix.letterToNum(x), col:y, weapon:data};
      this.socket.emit('play', data);
  };

}
