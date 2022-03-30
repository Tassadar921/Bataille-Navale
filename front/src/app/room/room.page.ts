import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {DeckSelectionComponent} from '../shared/components/deck-selection/deck-selection.component';
import {Socket} from 'ngx-socket-io';
import {StorageService} from '../shared/services/storage.service';
import {Router} from '@angular/router';
import {ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit, ViewWillEnter{

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

  ionViewWillEnter() {
    this.ready = false;
  }

  async ngOnInit() {
    this.matrix = this.opMatrix.reinitMatrix();
    this.socket.connect();
    this.socket.emit('enterRoom', {name: await this.storage.getNickname()});
    this.socket.on('toGame', (token) => {
      this.router.navigateByUrl('/game?token=' + token);
    });
    this.closeModal();
    // await this.http.lastConnected();
  }

  switchReady = async () => {
    if(this.ready) {
      this.ready = !this.ready;
      this.socket.emit('notReadyAnymore');
    }else{
      if(this.race) {
        this.ready = !this.ready;
        this.socket.emit('ready', {matrix: this.matrix, race: this.race});
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
    if(this.deckSelection) {
      if (this.deckSelection.matrix) {
        this.output = '';
        this.matrix = this.deckSelection.matrix;
        this.race = this.deckSelection.race;
      }
    }
    setTimeout(this.closeModal, 3000);
  };
}
