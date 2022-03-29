import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';

import {ComponentsModule} from '../shared/components/components.module';
import {DisconnectedComponent} from './disconnected/disconnected.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    ComponentsModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [GamePage, DisconnectedComponent]
})
export class GamePageModule {}
