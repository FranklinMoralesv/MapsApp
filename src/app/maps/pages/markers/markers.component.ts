import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface customMarker {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [`
 
  .list-group {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
  }
  
  `
  ]
})
export class MarkersComponent implements AfterViewInit {
  @ViewChild('map') divMapElement!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ];

  // Arreglo de marcadores
  markers: customMarker[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: this.divMapElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

  }


  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.map );
      
    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkerLocalStorage()

    newMarker.on('dragend', () => {
      this.saveMarkerLocalStorage();
    });

  }

  goToMarker( marker: mapboxgl.Marker |undefined ) {
    this.map.flyTo({
      center: marker?.getLngLat()
    });
  }


  saveMarkerLocalStorage() {

    const lngLatArr: customMarker[] = [];

    this.markers.forEach( m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [ lng, lat ]
      });
    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr) );

  }

  leerLocalStorage() {
    
    if ( !localStorage.getItem('markers') ) {
      return;
    }

    const lngLatArr: customMarker[] = JSON.parse( localStorage.getItem('markers')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat( m.center! )
        .addTo( this.map );

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkerLocalStorage();
      });


    });
    
  }

  deleteMarker( i: number ) {
   
    this.markers[i].marker?.remove();
    this.markers.splice( i, 1);
    this.saveMarkerLocalStorage();
  }

}
