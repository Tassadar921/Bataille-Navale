import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpService} from '../../shared/services/http.service';
import {LoginService} from '../../shared/services/login.service';

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
  public matrix = [];
  public output;

  private p;

  constructor(
    private http: HttpService,
    private loginServ: LoginService,
  ) {}

  ngOnInit() {
    this.p = this.loginServ.setPlatform();
    this.decks = this.http.getDeckNames();
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
    this.matrix = await this.http.getMatrix(deck);
    console.log(this.matrix);
    this.output=deck + ' Selected';
  };

}