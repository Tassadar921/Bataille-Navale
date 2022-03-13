import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Clipboard} from '@angular/cdk/clipboard';
import {StorageService} from '../shared/services/storage.service';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-conf-account',
  templateUrl: './conf-account.page.html',
  styleUrls: ['./conf-account.page.scss'],
})
export class ConfAccountPage implements OnInit {

  public output;
  public redirect = false;

  private token;
  private username;
  private mail;
  private password;

  private retour;

  constructor(
    private getVarInURL: ActivatedRoute,
    private router: Router,
    private clipboard: Clipboard,
    private storage: StorageService,
    private httpService: HttpService,
  ) {
  }

  async ngOnInit() {
    this.getVarInURL.queryParams.subscribe(params => {
      this.token = params.token;
      this.username = params.name;
      this.mail = params.mail;
      this.password = params.password;
    });

    this.retour = await this.httpService.checkToken(this.token, this.mail);
    this.output = this.retour.message;
    if (this.retour.output === 1) {
      this.retour = await this.httpService.signUp(this.username, this.password, this.mail);
      this.output = this.retour.message;
      if (this.retour.return === true) {
        await this.storage.setNickname(this.username);
        this.redirect = true;
        await this.router.navigateByUrl('/welcome');
      }
    }
  };

  redir = async (dest) => {
    await this.router.navigateByUrl(dest);
  };

  copy = () => {
    this.clipboard.copy('noreply.tassadar.ovh@gmail.com');
    this.output = 'Email adress copied to clipboard !';
  };

}
