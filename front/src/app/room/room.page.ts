import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../shared/services/http.service';
import {OpMatrixService} from '../shared/services/op-matrix.service';
import {DeckSelectionComponent} from '../shared/components/deck-selection/deck-selection.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  @ViewChild(DeckSelectionComponent) deckSelection: DeckSelectionComponent;

  public matrix = [];
  public ready = false;

  private retour;

  constructor(
    private http: HttpService,
    public opMatrix: OpMatrixService,
  ) { }

  ngOnInit() {
    this.matrix = this.opMatrix.reinitMatrix();
  }

  switchReady = () => this.ready = !this.ready;

  getMatrix = async (name) => {
    this.retour = await this.http.getMatrix(name);
    this.matrix = this.retour.output;
  };

  closeModal = () => {
    if(this.deckSelection.matrix) {
      this.matrix = this.deckSelection.matrix;
    }
  };
}
