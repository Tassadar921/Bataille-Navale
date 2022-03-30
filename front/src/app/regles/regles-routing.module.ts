import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglesPage } from './regles.page';

const routes: Routes = [
  {
    path: '',
    component: ReglesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglesPageRoutingModule {}
