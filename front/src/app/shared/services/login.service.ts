import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {Platform} from '@ionic/angular';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public retour;

  constructor(
    private storage: StorageService,
    private platform: Platform,
    private httpService: HttpService,
  ) {}

  refresh = async () => { //pour chaque changement de page, update de lastconnected pour la session en cours
    await this.httpService.lastConnected();
  };

  setPlatform=()=>{ //nb d'éléments affichés quand on a un système de pages
    if (this.platform.is('mobile') || this.platform.is('mobileweb')) {
      return 5;
    } else {
      return 10;
    }
  };
}
