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
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98],
              [-70.11617, 43.68405],
              [-70.64573401557249, 43.090083319667144],
              [-70.75102474636725, 43.08003225358635],
              [-70.79761105007827, 43.21973948828747],
              [-70.98176001655037, 43.36789581966826],
              [-70.94416541205806, 43.46633942318431],
              [-71.08482, 45.3052400000002],
              [-70.6600225491012, 45.46022288673396],
              [-70.30495378282376, 45.914794623389355],
              [-70.00014034695016, 46.69317088478567],
              [-69.23708614772835, 47.44777598732787],
              [-68.90478084987546, 47.184794623394396],
              [-68.23430497910454, 47.35462921812177],
              [-67.79035274928509, 47.066248887716995],
              [-67.79141211614706, 45.702585354182816],
              [-67.13734351262877, 45.137451890638886],
            ],
          ],
        },
      },
    ],
  };
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
