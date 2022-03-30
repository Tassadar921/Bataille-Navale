import { Component, OnInit } from '@angular/core';
import * as PluginsLibrary from 'capacitor-video-player';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public videoPlayer;

  constructor() { }

  ngOnInit() {
    this.videoPlayer = PluginsLibrary.CapacitorVideoPlayer
  }

}
