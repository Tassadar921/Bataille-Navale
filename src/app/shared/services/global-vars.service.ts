import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarsService {

  private connected=true;
  private nickname='Tassadar';
  private exists = 1;
  constructor() { }
  getConnected=()=>this.connected;
  switchConnected=()=>this.connected ? this.connected=false : this.connected=true;

  getNickname=()=>this.nickname;
  setNickname=(replace)=>this.nickname=replace;
  switch = (val) => { this.exists = val;
  };
}
