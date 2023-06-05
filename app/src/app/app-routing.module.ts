import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateCarComponent } from './pages/create-car/create-car.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create', component: CreateCarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
