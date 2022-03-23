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
      this.retour = this.opMatrix.editMatrix(this.matrix, dropData, col, line, this.direction, this.numberOfShips, '-');
      this.matrix = this.retour.mat;
      this.numberOfShips = this.retour.ships;
      this.output = this.retour.message;
    } else {
      this.output = 'No ship of this model anymore';
    }
  };

  // deleteSpaceship = (ship, col, line) => {
  //   col = this.opMatrix.letterToNum(col);
  //   let tmpLine1 = line;
  //   let tmpLine2 = line;
  //   let tmpLine3 = line;
  //   let tmpLine4 = line;
  //   let tmpCol1 = col;
  //   let tmpCol2 = col;
  //   let tmpCol3 = col;
  //   let tmpCol4 = col;
  //   this.matrix[line][col] = 0;
  //   switch (this.opMatrix.nameToShape(ship.split('_')[0].toLowerCase())) {
  //     case 1:
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       break;
  //     case 2:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           break;
  //         case'L':
  //           tmpCol1 += 1;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           break;
  //         case'R':
  //           tmpCol1 -= 1;
  //           break;
  //       }
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       break;
  //     case 3:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpCol1 += 1;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpCol1 -= 1;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           break;
  //       }
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[line][tmpCol1] = 0;
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //       } else {
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[tmpLine1][tmpCol2] = 0;
  //       }
  //       break;
  //     case 4:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           break;
  //         case'L':
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           break;
  //         case'R':
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine1][tmpCol1] = 0;
  //         this.matrix[tmpLine2][tmpCol2] = 0;
  //         this.matrix[tmpLine3][tmpCol3] = 0;
  //       } else {
  //         this.matrix[line][tmpCol1] = 0;
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //       }
  //       break;
  //     case 5:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpCol1 += 1;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpCol1 -= 1;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[line][tmpCol1] = 0;
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //         this.matrix[tmpLine3][col] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //       } else {
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[tmpLine1][tmpCol2] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //       }
  //       break;
  //     case 6:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpLine4 += 4;
  //           tmpCol1 += 1;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           tmpCol4 += 4;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpLine4 -= 4;
  //           tmpCol1 -= 1;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           tmpCol4 -= 4;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[line][tmpCol1] = 0;
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //         this.matrix[tmpLine3][col] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //         this.matrix[tmpLine4][col] = 0;
  //         this.matrix[tmpLine4][tmpCol1] = 0;
  //       } else {
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[tmpLine1][tmpCol2] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //         this.matrix[line][tmpCol4] = 0;
  //         this.matrix[tmpLine1][tmpCol4] = 0;
  //       }
  //       break;
  //     case 7:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpLine4 += 4;
  //           tmpCol1 -= 1;
  //           tmpCol2 += 1;
  //           break;
  //         case'L':
  //           tmpLine1 += 1;
  //           tmpLine2 -= 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           tmpCol4 += 4;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpLine4 -= 4;
  //           tmpCol1 += 1;
  //           tmpCol2 -= 1;
  //           break;
  //         case'R':
  //           tmpLine1 -= 1;
  //           tmpLine2 += 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           tmpCol4 -= 4;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[tmpLine3][col] = 0;
  //       this.matrix[tmpLine4][col] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine1][col] = 0;
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //         this.matrix[tmpLine4][tmpCol1] = 0;
  //         this.matrix[tmpLine3][tmpCol2] = 0;
  //         this.matrix[tmpLine4][tmpCol2] = 0;
  //       } else {
  //         this.matrix[line][tmpCol1] = 0;
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //         this.matrix[line][tmpCol4] = 0;
  //         this.matrix[tmpLine2][tmpCol3] = 0;
  //         this.matrix[tmpLine2][tmpCol4] = 0;
  //       }
  //       break;
  //     case 8:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpLine4 += 4;
  //           tmpCol1 -= 1;
  //           tmpCol2 += 1;
  //           tmpCol3 += 2;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 += 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           tmpCol4 += 4;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpLine4 -= 4;
  //           tmpCol1 += 1;
  //           tmpCol2 -= 1;
  //           tmpCol3 -= 2;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 -= 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           tmpCol4 -= 4;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[line][tmpCol2] = 0;
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[tmpLine1][tmpCol2] = 0;
  //       this.matrix[tmpLine2][tmpCol2] = 0;
  //       this.matrix[tmpLine3][tmpCol2] = 0;
  //       this.matrix[tmpLine2][tmpCol3] = 0;
  //       this.matrix[tmpLine3][tmpCol3] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine3][col] = 0;
  //         this.matrix[tmpLine4][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //         this.matrix[tmpLine4][tmpCol1] = 0;
  //         this.matrix[tmpLine4][tmpCol2] = 0;
  //         this.matrix[tmpLine4][tmpCol3] = 0;
  //       } else {
  //         this.matrix[line][tmpCol1] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //         this.matrix[line][tmpCol4] = 0;
  //         this.matrix[tmpLine3][tmpCol4] = 0;
  //         this.matrix[tmpLine1][tmpCol1] = 0;
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //         this.matrix[tmpLine1][tmpCol4] = 0;
  //         this.matrix[tmpLine2][tmpCol4] = 0;
  //       }
  //       break;
  //     case 9:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpLine4 += 4;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           tmpCol4 += 4;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpLine4 -= 4;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           tmpCol4 -= 4;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[line][tmpCol1] = 0;
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       this.matrix[tmpLine1][tmpCol2] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //         this.matrix[tmpLine4][tmpCol1] = 0;
  //         this.matrix[line][tmpCol2] = 0;
  //       } else {
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //         this.matrix[tmpLine1][tmpCol4] = 0;
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //       }
  //       break;
  //     case 10:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpCol1 -= 1;
  //           tmpCol2 += 1;
  //           tmpCol3 += 2;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 += 1;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpCol1 += 1;
  //           tmpCol2 -= 1;
  //           tmpCol3 -= 2;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 -= 1;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[tmpLine1][tmpCol2] = 0;
  //       this.matrix[tmpLine2][tmpCol2] = 0;
  //       this.matrix[tmpLine2][tmpCol3] = 0;
  //       this.matrix[line][tmpCol2] = 0;
  //       this.matrix[tmpLine3][tmpCol2] = 0;
  //       this.matrix[tmpLine3][tmpCol3] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine2][col] = 0;
  //         this.matrix[tmpLine3][col] = 0;
  //         this.matrix[tmpLine2][tmpCol1] = 0;
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //       } else {
  //         this.matrix[line][tmpCol1] = 0;
  //         this.matrix[line][tmpCol3] = 0;
  //         this.matrix[tmpLine1][tmpCol1] = 0;
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //       }
  //       break;
  //     case 11:
  //       switch (this.direction) {
  //         case'U':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpLine3 += 3;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           break;
  //         case'L':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpCol1 += 1;
  //           tmpCol2 += 2;
  //           tmpCol3 += 3;
  //           break;
  //         case'D':
  //           tmpLine1 -= 1;
  //           tmpLine2 -= 2;
  //           tmpLine3 -= 3;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           break;
  //         case'R':
  //           tmpLine1 += 1;
  //           tmpLine2 += 2;
  //           tmpCol1 -= 1;
  //           tmpCol2 -= 2;
  //           tmpCol3 -= 3;
  //           break;
  //       }
  //       this.changeNumberOfShips(ship.split('_')[0][ship.split('_')[0].length-1], '+');
  //       this.matrix[tmpLine1][col] = 0;
  //       this.matrix[line][tmpCol1] = 0;
  //       this.matrix[tmpLine1][tmpCol1] = 0;
  //       this.matrix[tmpLine2][tmpCol1] = 0;
  //       if (this.direction === 'U' || this.direction === 'D') {
  //         this.matrix[tmpLine3][tmpCol1] = 0;
  //         this.matrix[line][tmpCol2] = 0;
  //         this.matrix[tmpLine1][tmpCol2] = 0;
  //       } else {
  //         this.matrix[tmpLine1][tmpCol2] = 0;
  //         this.matrix[tmpLine1][tmpCol3] = 0;
  //         this.matrix[tmpLine2][col] = 0;
  //       }
  //       break;
  //   }
  // console.log(this.matrix);
  // }
}
