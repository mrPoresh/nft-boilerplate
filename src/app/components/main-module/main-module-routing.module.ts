import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { AssetsPageComponent } from './assets-page/assets-page.component';
import { FocusPageComponent } from './focus-page/focus-page.component';

const routes: Routes = [
  { path: 'explore-collections', component: ExploreCollectionsComponent },
  { path: 'collection/:name', component: CollectionsPageComponent },  /* /:id */
  { path: 'assets', component: AssetsPageComponent },
  { path: 'assets/:address/:id', component: FocusPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
