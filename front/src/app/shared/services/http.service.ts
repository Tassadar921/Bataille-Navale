import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private retour;

  constructor(
    private storage: StorageService,
    private http: HttpClient,
  ) {}

  ////////////////////////////// MAILS //////////////////////////////

  checkToken = async (tok, email) => {
    const token = {
      token: tok,
      mail: email,
    };
    await this.http.post<string>(environment.urlBack + 'checkToken', token).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  mailToken = async (email, username, pass) => {
    const data = {
      mail: email,
      name: username,
      password: pass
    };
    await this.http.post<string>(environment.urlBack + 'mailToken', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  sendResetPassword = async (email) => {
    const data = {mail: email};
    await this.http.post<string>(environment.urlBack + 'sendResetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  ////////////////////////////// ACCOUNTS //////////////////////////////
  signUp = async (username, pass, email) => {
    const data = {
      name: username,
      password: pass,
      mail: email
    };
    await this.http.post<string>(environment.urlBack + 'signUp', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  login = async (username, pass) => {
    const data = {
      name: username,
      password: pass,
    };
    await this.http.post<string>(environment.urlBack + 'login', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  resetPassword = async (userId, pass) => {
    const data = {
      id: userId,
      password: pass
    };
    await this.http.post<string>(environment.urlBack + 'resetPassword', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserIdByUsername = async (username) => {
    const data = {name: username};
    await this.http.post<string>(environment.urlBack + 'getUserIdByUsername', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getUserDemandsReceivedLength = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands.length;
  };

  getUserFriends = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserFriends', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.links;
  };

  getUserListExceptOne = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserListExceptOne', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.output;
  };

  getUserDemandsSent = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsSent', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  getUserDemandsReceived = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<Array<string>>(environment.urlBack + 'getUserDemandsReceived', data).toPromise().then(res => {
      this.retour = res;
    });
    return this.retour.demands;
  };

  askFriend = async (username) => {
    const data = {from: await this.storage.getNickname(), to: username};
    await this.http.post<Array<string>>(environment.urlBack + 'askFriend', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  addFriend = async (username) => {
    const data = {user1: await this.storage.getNickname(), user2: username};
    this.retour = await this.deleteDemand(await this.storage.getNickname(), username);
    this.retour = await this.deleteDemand(username, await this.storage.getNickname());
    await this.http.post<string>(environment.urlBack + 'addFriend', data).toPromise().then(response => {
      this.retour = response;
    });

    return this.retour.message;
  };

  deleteFriendship = async (username) => {
    const data = {username1: username, username2: this.storage.getNickname()};
    await this.http.post<string>(environment.urlBack + 'deleteFriendship', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  deleteDemand = async (send, receive) => {
    console.log('sender : ', send);
    console.log('receiver : ', receive);
    const data = {sender: send, receiver: receive};
    await this.http.post<string>(environment.urlBack + 'deleteDemand', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.message;
  };

  lastConnected = async () => {
    const data = {name: await this.storage.getNickname()};
    await this.http.post<string>(environment.urlBack + 'lastConnected', data).toPromise().then(response => {
      this.retour = response;
    });
  };

  /////////////////////////// EDITOR ///////////////////////////////

  saveDeck = async (tab, faction, name) => {
    const data = {username: await this.storage.getNickname(), matrix: tab, race: faction, deckName: name};
    await this.http.post<string>(environment.urlBack + 'saveDeck', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getDeckNames = async () => {
    const data = {username: await this.storage.getNickname()};
    await this.http.post<string>(environment.urlBack + 'getDeckNames', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.output;
  };

  getMatrix = async (name) => {
    const data = {deckName: name};
    await this.http.post<string>(environment.urlBack + 'getMatrix', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.output;
  };

  overwrite = async (tab, faction, name) => {
    const data = {username: await this.storage.getNickname(), matrix: tab, race: faction, deckName: name};
    await this.http.post<string>(environment.urlBack + 'overwrite', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour;
  };

  getNumberOfShips = async (faction) => {
    const data = {race: faction};
    await this.http.post<string>(environment.urlBack + 'getNumberOfShips', data).toPromise().then(response => {
      this.retour = response;
    });
    return this.retour.output;
  };
}
