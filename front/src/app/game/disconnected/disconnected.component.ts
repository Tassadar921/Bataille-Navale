import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-disconnected',
  templateUrl: './disconnected.component.html',
  styleUrls: ['./disconnected.component.scss'],
})
export class DisconnectedComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  backToRoom = () => {
    this.router.navigateByUrl('/room');
  };
}
