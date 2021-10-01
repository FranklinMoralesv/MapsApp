import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    
    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 4rem;
      left: 1rem;
      padding: 1rem;
      position: fixed;
      z-index: 999;
      width: 60vw;
    }
    @media (min-width:  768px){
       .row{
      font-size:1.25rem;   
      background-color: white;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      width: 400px;
       }
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

 
  @ViewChild('map') divMapElement!: ElementRef;//sirve para buscar referencias elementos del html , como por ejemplo referencias locales
  //el viewChiled hace que se pueda usar elementos html como propiedades
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ];

  constructor() {}

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMapElement.nativeElement,//native.element es el elemento html
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map.getZoom() > 18 ) {
        this.map.zoomTo( 18 );
      }
    });

    // Movimiento del mapa
    this.map.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });


  }


  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomChange( valor: string ) {
    this.map.zoomTo( Number(valor) );
  }

}
