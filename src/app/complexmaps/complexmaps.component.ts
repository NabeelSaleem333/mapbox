import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-complexmaps',
  templateUrl: './complexmaps.component.html',
  styleUrls: ['./complexmaps.component.scss'],
})
export class ComplexmapsComponent implements OnInit {
  // Objects
  map: mapboxgl.Map;
  // Arrays
  // Variables
  // Counters
  /////////////
  constructor() {}

  ngOnInit() {
    this.initMapBox();
  }

  /*
  Function to initialize the MapBox
   */
  initMapBox() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'mapcomplexId',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [73.056229, 33.722319], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    this.fullScreenControl();
    this.ZoomInOutControl();
    this.UserLocationControl();
  }
  /*
  function to add controls on the mapbox
  1- fullScreen
  2- Zoom in & Zoom out
  3- Current User location
  */
  fullScreenControl() {
    this.map.addControl(new mapboxgl.FullscreenControl());
  }
  ZoomInOutControl() {
    this.map.addControl(new mapboxgl.NavigationControl());
  }
  UserLocationControl() {
    const res = this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  /*
  Add complex overlay on mapbox
  */
  complexOverlay() {
    // this.map.addSource('mine', {
    //   type: 'geojson',
    //   data: {this.geojson}
    // });
  }
}
