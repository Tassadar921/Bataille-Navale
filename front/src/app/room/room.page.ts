import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {DeckSelectionComponent} from '../shared/components/deck-selection/deck-selection.component';
import {Socket} from 'ngx-socket-io';
import {StorageService} from '../shared/services/storage.service';
import {Router} from '@angular/router';
import {ViewDidLeave, ViewWillLeave} from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit, ViewWillLeave{

  @ViewChild(DeckSelectionComponent) deckSelection: DeckSelectionComponent;

  public matrix = [];
  public ready = false;
  public output;

  private race;
  private retour;

  constructor(
    private http: HttpService,
    public opMatrix: OpMatrixService,
    private socket: Socket,
    private storage: StorageService,
    private router: Router,
  ) {
    this.ready = false;
  }

  async ngOnInit() {
    this.ready = false;
    this.matrix = this.opMatrix.reinitMatrix();
    this.socket.connect();
    this.socket.emit('enterRoom');
    this.socket.on('toGame', () => {
      this.router.navigateByUrl('/game?race=' + this.race + '&matrix=' + JSON.stringify(this.matrix));
    });
    this.socket.emit('test', 'début');
    console.log('trigger');
  }

  ionViewWillLeave() {
    console.log('///////////////////////////////////////////////////////');
    this.socket.emit('test', 'fin');
  }

  switchReady = async () => {
    if(this.ready) {
      this.ready = !this.ready;
      this.socket.emit('notReadyAnymore', await this.storage.getNickname());
    }else{
      if(this.race) {
        this.ready = !this.ready;
        this.socket.emit('ready', await this.storage.getNickname());
      }else{
        this.output='Select a template first';
      }
    }
  };

  getMatrix = async (name) => {
    this.retour = await this.http.getMatrix(name);
    this.matrix = this.retour.output;
  };

  closeModal = () => {
    if(this.deckSelection.matrix) {
      this.output='';
      this.matrix = this.deckSelection.matrix;
      this.race = this.deckSelection.race;
    }
  };
}
