import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DroppableDirective} from 'angular-draggable-droppable';
import {HttpService} from '../shared/services/http.service';
import {DeckSelectionComponent} from './deck-selection/deck-selection.component';
import {ActionSheetController} from '@ionic/angular';
import {OpMatrixService} from '../shared/services/op-matrix.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  @ViewChild(DroppableDirective, {read: ElementRef, static: true})
  @ViewChild(DeckSelectionComponent) deckSelection: DeckSelectionComponent;

  public matrix = [];
  public race = 'Human';
  public output = '';
  public deckName = '';
  public outputSubmit;
  public numberOfShips = [];

  public direction = 'U';
  private retour;

  constructor(
    private http: HttpService,
    private actionSheetController: ActionSheetController,
    public opMatrix: OpMatrixService,
  ) {
  }

  async ngOnInit() {
    await this.reinitMatrix();
  }

  closeModal = () => {
    this.matrix = this.deckSelection.matrix;
  };

  isFirst = (name) => name.includes('1.1');

  reinitMatrix = async () => {
    this.matrix = this.opMatrix.reinitMatrix();
    this.numberOfShips = await this.http.getNumberOfShips(this.race);
  };

  setSelected = (val) => this.direction = val;

  setId = (key) => {
    if (this.direction === key) {
      return 'selected';
    } else {
      return '';
    }
  };

  trigger = (input) => {
    if (input === 'Enter') {
      this.save();
    }
  };

  save = async () => {
    if (this.deckName) {
      this.retour = await this.http.saveDeck(this.matrix, this.race, this.deckName);
      if (this.retour.message === 'Overwrite backup ?') {
        const actionSheet = await this.actionSheetController.create({
          header: this.retour.message,
          buttons: [{
            text: 'Oui',
            role: 'destructive',
            icon: 'create',
            handler: () => {
              this.http.overwrite(this.matrix, this.race, this.deckName);
              this.outputSubmit = 'Overwriten';
            }
          }, {
            text: 'Non',
            icon: 'close',
            role: 'cancel',
          }]
        });
        await actionSheet.present();
      } else {
        this.outputSubmit = this.retour.message;
      }
    }
  };

  onDrop = (dropData, col, line) => {
    this.output = '';
    if (this.numberOfShips[dropData[dropData.length - 1] - 1] > 0) {
      this.retour = this.opMatrix.editMatrix(this.matrix, dropData, col, line, this.direction, this.numberOfShips, this.race, '-');
      this.matrix = this.retour.mat;
      this.numberOfShips = this.retour.ships;
      this.output = this.retour.message;
    } else {
      this.output = 'No ship of this model anymore';
    }
  };

  deleteSpaceship = (ship, col, line) => {
    this.retour = this.opMatrix.editMatrix(this.matrix, ship, col, line, this.direction, this.numberOfShips, this.race, '+');
    this.matrix = this.retour.mat;
    this.numberOfShips = this.retour.ships;
    this.output = this.retour.message;
  };
}
