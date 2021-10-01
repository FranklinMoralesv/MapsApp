import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [`
  div {
    width: 100%;
    height: 150px;
    margin: 0px;
  }
`
  ]
})
export class MiniMapComponent implements AfterViewInit {

  
  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map') divMapElement!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: true
    });

    new mapboxgl.Marker()
        .setLngLat( this.lngLat )
        .addTo( mapa );
  }

}
