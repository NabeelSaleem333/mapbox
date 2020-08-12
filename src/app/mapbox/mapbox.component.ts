import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// var MapboxDraw = require('@mapbox/mapbox-gl-draw');
// tslint:disable-next-line: import-spacing
// import { mapboxgl } from 'mapbox-gl/dist/mapbox-gl.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {
  //
  opacity = 1;
  //
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 72.75;
  lng = 33.41;
  tag = 'RWP';
  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [24, 24],
        },
        geometry: {
          type: 'Point',
          coordinates: { lat: 62.324462890625, lng: 33.024695711685304 },
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [24, 24],
        },
        geometry: {
          type: 'Point',
          coordinates: { lat: 73.2158203125, lng: 33.97189158092897 },
        },
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [24, 24],
        },
        geometry: {
          type: 'Point',
          coordinates: { lat: 51.29223632812499, lng: 34.28151823530889 },
        },
      },
    ],
  };

  mapArray = [
    {
      lat: 72.99641,
      lng: 33.645992,
      tag: 'Islamabad',
      size: [24, 24],
    },
    {
      lat: 73.0169,
      lng: 33.5651,
      tag: 'Rawalpindi',
      size: [24, 24],
    },
    {
      lat: 71.5249,
      lng: 34.0151,
      tag: 'Peshawar',
      size: [24, 24],
    },
    {
      lat: 67.0011,
      lng: 24.8607,
      tag: 'Karachi',
      size: [24, 24],
    },
  ];

  constructor() {}

  ngOnInit() {
    this.initializemapbox();
  }
  initializemapbox() {
    // add to map
    // mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibmFiZWVsc2FsZWVtIiwiYSI6ImNrY3p4MWhrZzBiNWwyd3FtOGx3aTZsbjEifQ.z6RLknl-YnJe2eKqMjPElg',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [73.024955 , 33.650753], // starting position [lng, lat]
      zoom: 5, // starting zoom
      // style: this.mapStyle
    });
    // // tslint:disable-next-line: max-line-length
    // // for (const item of this.mapArray) {
    // //   console.log(item);
    // //   const d = document.createElement('div');
    // //   d.className = 'marker';
    // //   const marker = new mapboxgl.Marker(d)
    // //     .setLngLat([item.lat, item.lng])
    // //     .setPopup(new mapboxgl.Popup().setHTML(item.tag))
    // //     .setDraggable(true)
    // //     .addTo(this.map);
    // //   marker.togglePopup();
    // // }
    this.mapArray.forEach((marker) => {
      // create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'marker';
      // 'url(../../assets/mapbox-icon.png)';
      el.style.backgroundImage = 'url(/assets/icon/locpin.png)';
      // el.style.width = marker.properties.iconSize[0] + 'px';
      // el.style.height = marker.properties.iconSize[1] + 'px';
      // el.style.background = 'cover';
      el.style.borderRadius = '50%';
      el.style.display = 'block';
      el.style.border = 'none';
      el.style.cursor = 'pointer';
      el.style.padding = '0';
      el.style.width = marker.size[0] + 'px';
      el.style.height = marker.size[1] + 'px';
      // el.addEventListener('click', () => {
      //   window.alert(marker.properties.message);
      // new mapboxgl.Marker().setPopup(new mapboxgl.Popup().setHTML(this.tag)).addTo(this.map);
      // });
      //   // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([
          marker.lat,
          marker.lng,
        ])
        .setPopup(new mapboxgl.Popup().setHTML(marker.tag))
        .addTo(this.map);
      // new mapboxgl.Marker(el).setLngLat([marker.lat, marker.lng])
      // .setPopup(new mapboxgl.Popup().setHTML(marker.tag)).addTo(this.map);
    });
    // this.map.addSource
    this.mapboxOverlay();
    // //
    // console.log(marker.getLngLat());
    // for (const m of this.mapArray)
    // var Draw = new MapboxDraw();
    // this.map.addControl(Draw, 'top-left');
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  mapboxOverlay() {
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');
    this.map.on('load', () => {
      // tslint:disable-next-line: no-unused-expression
      this.map.addSource('myImageSource', {
        type: 'image',
        url: 'assets/maps/i-10-islamabad.jpg',
        coordinates: [
          [73.024955 , 33.650753], // cda kashmir highway
          [73.041134, 33.659291 ], // rizvi road kashmir highway:
          [73.051520, 33.645466], // Service Rd West I-10 Islamabad,
          [73.035384, 33.636927], // I-10/3 I 10/3 I-10, Islamabad, Islamabad
        ],
      });
      this.map.addLayer({
        id: 'myImageSource',
        source: 'myImageSource',
        type: 'raster',
        paint: {
          'raster-opacity': this.opacity,
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
  /*
  This function is used to control the opacity of the
  overlay image
  */
  opacityControl() {
    // this.map.on('load', () => {
    //   this.map.addSource('national-park', {
    //     type: 'geojson',
    //     data: {
    //       type: 'FeatureCollection',
    //       features: [
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Polygon',
    //             coordinates: [
    //               [
    //                 [-121.353637, 40.584978],
    //                 [-121.284551, 40.584758],
    //                 [-121.275349, 40.541646],
    //                 [-121.246768, 40.541017],
    //                 [-121.251343, 40.423383],
    //                 [-121.32687, 40.423768],
    //                 [-121.360619, 40.43479],
    //                 [-121.363694, 40.409124],
    //                 [-121.439713, 40.409197],
    //                 [-121.439711, 40.423791],
    //                 [-121.572133, 40.423548],
    //                 [-121.577415, 40.550766],
    //                 [-121.539486, 40.558107],
    //                 [-121.520284, 40.572459],
    //                 [-121.487219, 40.550822],
    //                 [-121.446951, 40.56319],
    //                 [-121.370644, 40.563267],
    //                 [-121.353637, 40.584978],
    //               ],
    //             ],
    //           },
    //         },
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [-121.415061, 40.506229],
    //           },
    //         },
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [-121.505184, 40.488084],
    //           },
    //         },
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [-121.354465, 40.488737],
    //           },
    //         },
    //       ],
    //     },
    //   });

    //   this.map.addLayer({
    //     id: 'park-boundary',
    //     type: 'fill',
    //     source: 'national-park',
    //     paint: {
    //       'fill-color': '#888888',
    //       'fill-opacity': 0.4,
    //     },
    //     filter: ['==', '$type', 'Polygon'],
    //   });

    //   this.map.addLayer({
    //     id: 'park-volcanoes',
    //     type: 'circle',
    //     source: 'national-park',
    //     paint: {
    //       'circle-radius': 6,
    //       'circle-color': '#B42222',
    //     },
    //     filter: ['==', '$type', 'Point'],
    //   });
    // });
  }
}
