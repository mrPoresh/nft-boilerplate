import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestPageComponent } from './components/base-components/test-page/test-page.component';

const routes: Routes = [
  { path: '', component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
