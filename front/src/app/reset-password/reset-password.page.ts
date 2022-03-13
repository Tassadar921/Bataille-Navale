import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../shared/services/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public username;
  public mail;
  public password;
  public confPassword;

  public output = '';
  public showPassword = 1;

  private retour;
  private token;
  private userId;

  constructor(
    private getVarInURL: ActivatedRoute,
    private router: Router,
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
    this.retour = await this.httpService.getUserIdByUsername(this.username);
    this.output = this.retour.message;
    this.userId = this.retour.id;
  }

  showPass = () => {
    if (this.showPassword) {
      this.showPassword = 0;
    } else {
      this.showPassword = 1;
    }
  };

  submitReset = async () => {
    if (!this.password || !this.confPassword) {
      this.output = 'Passwords required';
    } else {
      if (this.password !== this.confPassword) {
        this.output = 'Passwords must be the same ones';
      } else {
        if (this.password === this.confPassword) {
          this.retour = await this.httpService.resetPassword(this.userId, this.password);
          this.output = this.retour.message;
        }
      }
    }
  };

  updateReset = (e) => {
    if (e.key === 'Enter') {
      this.submitReset();
    }
  };

  toLogin = () => {
    this.router.navigateByUrl('/home');
  };

}
