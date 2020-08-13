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
  // -
  geojson = {
    coordinates: [
      [33.652982, 72.877392],
      [33.652946, 72.898120],
      [33.637977, 72.898034],
      [33.638049, 72.877349],
    ],
  };
  // Arrays
  // Variables
  // Counters
  /////////////
  constructor() {}

  ngOnInit() {
    this.initMapBox();
    this.complexOverlay();
  }

  /*
  Function to initialize the MapBox
   */
  initMapBox() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'mapcomplexId',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.geojson.coordinates[0][1], this.geojson.coordinates[0][0]], // starting position [lng, lat]
      zoom: 14, // starting zoom
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

    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');

    this.map.on('load', () => {
    this.map.addSource('myImageSource', {
      type: 'image',
      url: 'assets/maps/E-16-crop.png',
      coordinates: [
        [this.geojson.coordinates[0][1], this.geojson.coordinates[0][0]],
        [this.geojson.coordinates[1][1], this.geojson.coordinates[1][0]],
        [this.geojson.coordinates[2][1], this.geojson.coordinates[2][0]],
        [this.geojson.coordinates[3][1], this.geojson.coordinates[3][0]],
      ]
    });

    this.map.addLayer({
      id: 'myImageSource',
      source: 'myImageSource',
      type: 'raster',
      paint: {
        'raster-opacity': 1,
      },
    });
    slider.addEventListener('input', (e) => {
      // Adjust the layers opacity. layer here is arbitrary - this could
      // be another layer name found in your style or a custom layer
      // added on the fly using `addSource`.
      // e.target;
      const input = (document.getElementById('slider') as HTMLInputElement)
        .value;
      this.map.setPaintProperty(
        'myImageSource',
        'raster-opacity',
        parseInt('' + input + '', 10) / 100
      );
      // Value indicator
      sliderValue.textContent = '' + input + '' + '%';
    });
  });
}
}
