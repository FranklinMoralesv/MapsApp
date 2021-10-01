import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarkersComponent } from './pages/markers/markers.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    
    children: [
      { path: 'zoom-range', component: ZoomRangeComponent },
      { path: 'markers', component: MarkersComponent },
      { path: 'propiedades', component: PropiedadesComponent },
      { path: '**', redirectTo: 'zoom-range' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
