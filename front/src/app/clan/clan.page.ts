import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.page.html',
  styleUrls: ['./clan.page.scss'],
})
export class ClanPage implements OnInit {
  public exists = 0;
  constructor() { }

  ngOnInit() {
  }
  switch = (val) => { this.exists = val;
  };
}
