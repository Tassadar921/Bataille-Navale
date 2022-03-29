import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClanPage } from './clan.page';

const routes: Routes = [
  {
    path: '',
    component: ClanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClanPageRoutingModule {}
