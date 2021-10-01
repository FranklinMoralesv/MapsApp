import { Component, OnInit } from '@angular/core';

interface MenuItem{
  route:string;
  name:string;

}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  menuItems:MenuItem[]=[
    {
      route:'/maps/zoom-range',
      name:'Zoom-Range'
    },
    {
      route:'/maps/markers',
      name:'Marcadores'
    },
    {
      route:'/maps/propiedades',
      name:'Propiedades'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
