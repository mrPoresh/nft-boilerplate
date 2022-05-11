import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';

const routes: Routes = [
  { path: 'explore-collections', component: ExploreCollectionsComponent },
  { path: 'collection/:name', component: CollectionsPageComponent },  /* /:id */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
