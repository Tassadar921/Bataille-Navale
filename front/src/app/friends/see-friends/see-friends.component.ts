import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared/services/login.service';
import {HttpService} from '../../shared/services/http.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-see-friends',
  templateUrl: './see-friends.component.html',
  styleUrls: ['./see-friends.component.scss'],
})
export class SeeFriendsComponent implements OnInit {

  public friends = [];
  public displayFriend = [];
  public output;
  public count = 0;
  public filter = '';
  public nbPages;

  private users = [];
  private p;

  constructor(
    private loginServ: LoginService,
    private httpService: HttpService,
    private actionSheetController: ActionSheetController,
  ) {
  }

  async ngOnInit() {
    this.p = this.loginServ.setPlatform();
    await this.loginServ.refresh();
    await this.displayFriendsFunction(0, 0, '');
  }

  getnbPages = () => {
    if (this.friends.length) {
      return Math.ceil(this.friends.length / this.p);
    } else {
      return 1;
    }
  };

  nextPage = async () => {
    let start = this.p * this.count;
    if (this.p * this.count + this.p < this.friends.length) {
      this.count++;
      start = this.p * this.count;
    }
    await this.displayFriendsFunction(this.count, start, this.filter);
  };

  previousPage = async () => {
    if (this.count !== 0) {
      this.count--;
    }
    const start = this.p * this.count;
    await this.displayFriendsFunction(this.count, start, this.filter);
  };

  search = async (n, start, filter) => {
    this.filter = filter.value;
    this.count = 0;
    await this.displayFriendsFunction(n, start, filter);
  };

  displayFriendsFunction = async (n, start, filter) => {
    this.friends = await this.httpService.getUserFriends();
    this.users = await this.httpService.getUserListExceptOne();

    let end;

    this.displayFriend = [];

    if (start < this.friends.length) {
      if (this.friends.length > start + this.p) {
        end = start + this.p;
      } else {
        end = this.friends.length;
      }

      for (let i = start; i < end; i++) {
        if (this.friends[i]) {
          if (this.friends[i].toUpperCase().includes(filter.toUpperCase())) {
            for (let k = 0; k < this.users.length; k++) {
              if (this.users[k].username === this.friends[i]) {
                this.displayFriend.push({friend: this.friends[i], lastConnected: this.users[k].lastConnected});
                k = this.users.length;
              }
            }
          }
        }
      }
    }
    this.nbPages = this.getnbPages();
  };

  deleteFromFriends = async (username) => {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm friendship deletion with ' + username + ' ?',
      buttons: [{
        text: 'Yes',
        icon: 'checkmark',
        handler: async () => {
          await this.httpService.deleteFriendship(username);
          await this.displayFriendsFunction(0, 0, this.filter);
          this.count = 0;
        }
      }, {
        text: 'No',
        icon: 'close',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  };

  invite = (username) => {
    console.log('on va inviter ' + username.friend);
    //ON VERRA PLUS TARD
  };
}
