import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {StorageService} from '../shared/services/storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {

  public matrix = [];
  public race;

  constructor(
    private getVarInURL: ActivatedRoute,
    private socket: Socket,
    public opMatrix: OpMatrixService,
    private storage: StorageService,
  ) { }

  async ngOnInit() {
    this.socket.connect();
    this.matrix = this.opMatrix.reinitMatrix();
    this.getVarInURL.queryParams.subscribe(params => {
      this.matrix = JSON.parse(params.matrix);
      this.race = params.race;
    });
    this.socket.emit('enterGame', {name: await this.storage.getNickname(), matrix: this.matrix, race: this.race});
  }

  ngOnDestroy() {
    this.socket.emit('disconnect');
  }

}
