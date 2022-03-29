import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {LoginService} from '../../services/login.service';
import {OpMatrixService} from '../../services/op-matrix.service';

@Component({
  selector: 'app-deck-selection',
  templateUrl: './deck-selection.component.html',
  styleUrls: ['./deck-selection.component.scss'],
})
export class DeckSelectionComponent implements OnInit, AfterViewInit {

  public decks;
  public count = 0;
  public nbPages;
  public filter = '';
  public displayDecks;
  public matrix = this.opMatrix.reinitMatrix();
  public output;
  public race;

  private p;
  private retour;

  constructor(
    private http: HttpService,
    private loginServ: LoginService,
    private opMatrix: OpMatrixService,
  ) {}

  async ngOnInit() {
    this.p = await this.loginServ.setPlatform();
    this.decks = await this.http.getDeckNames();
    this.matrix = this.opMatrix.reinitMatrix();
  }

  async ngAfterViewInit() {
    await this.displayDecksFunction(0, '');
  }

  getnbPages = () => {
    if (this.decks.length) {
      return Math.ceil(this.decks.length / this.p);
    } else {
      return -1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.decks.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.displayDecksFunction(start, this.filter);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.displayDecksFunction(start, this.filter);
  };

  search = async (n, start, filter) => {
    this.filter = filter.value;
    this.count = 0;
    await this.displayDecksFunction(start, filter);
  };

  displayDecksFunction = async (start, filter) => {

    this.decks = await this.http.getDeckNames();

    let end;

    this.displayDecks = [];

    if (start < this.decks.length) {
      if (this.decks.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.decks.length;
      }

      for (let i = start; i < end; i++) {
        if (this.decks[i]) {
          if (this.decks[i].name.toUpperCase().includes(filter.toUpperCase())) {
            this.displayDecks.push(this.decks[i]);
          }
        }
      }
    }
    this.nbPages = this.getnbPages();
  };

  select = async (deck) => {
    this.retour = await this.http.getMatrix(deck);
    this.matrix = this.retour.matrix;
    this.race = this.retour.race;
    this.output = deck + ' Selected';
  };

  deleteFromDatabase = async (name) => {
    this.retour = await this.http.deleteFromDatabase(name);
    this.output = this.retour.message;
    this.decks = await this.http.getDeckNames();
    await this.displayDecksFunction(0, this.filter);
  };

}
