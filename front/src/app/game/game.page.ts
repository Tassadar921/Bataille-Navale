import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Socket} from 'ngx-socket-io';
import {OpMatrixService} from '../shared/services/op-matrix.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public matrix = [];

  constructor(
    private getVarInURL: ActivatedRoute,
    private socket: Socket,
    public opMatrix: OpMatrixService,
  ) { }

  ngOnInit() {
    this.matrix = this.opMatrix.reinitMatrix();
    console.log(this.matrix);
    this.getVarInURL.queryParams.subscribe(params => {
      this.matrix = params.token;
    });
  }

}
