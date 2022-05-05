import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginRoute } from 'src/app/app-routing.module'
import { ExploreCollectionsComponent } from './explore-collections/explore-collections.component';

const routes: Routes = [
  { path: '', component: ExploreCollectionsComponent, children: [
    loginRoute
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainModuleRoutingModule { }
