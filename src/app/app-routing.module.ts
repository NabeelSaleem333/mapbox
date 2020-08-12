import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapboxComponent } from './mapbox/mapbox.component';
import { MapboxdbComponent } from './mapboxdb/mapboxdb.component';
import { ComplexmapsComponent } from './complexmaps/complexmaps.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mapbox',
    component: MapboxComponent
  },
  {
    path: 'mapboxdb',
    component: MapboxdbComponent
  },
  {
    path: 'mapboxcomplex',
    component: ComplexmapsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
