import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapboxdbService } from './mapboxdb.service';
//
@Component({
  selector: 'app-mapboxdb',
  templateUrl: './mapboxdb.component.html',
  styleUrls: ['./mapboxdb.component.scss'],
})
//
export class MapboxdbComponent implements OnInit {
  overlayId = '';
  // Objects
  map: mapboxgl.Map;
  // Arrays
  mapArray = [
    {
      coordinates: [73.024955, 33.650753],
      message: 'Islamabad',
      iconSize: [100, 30],
      pin: '/assets/icon/locpin.png',
    },
    // {
    //   lat: 73.0169,
    //   lng: 33.5651,
    //   tag: 'Rawalpindi',
    //   size: [24, 24],
    // },
    // {
    //   lat: 71.5249,
    //   lng: 34.0151,
    //   tag: 'Peshawar',
    //   size: [24, 24],
    // },
    {
      coordinates: [67.0011, 24.8607],
      message: 'Karachi',
      iconSize: [51, 22],
      pin: '/assets/icon/locpin.png',
    },
  ];
  onselect: any;
  variable: any;
  // Variables
  // Counters
  constructor(public mapboxServ: MapboxdbService) {}

  ngOnInit() {
    this.initializeMapBox();
    // this.fixPositionOnClick();
  }
  /*
  This function is used to initialize the mapbox
   */
  initializeMapBox() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'mapdb',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [73.056229, 33.722319], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    // tslint:disable-next-line: prefer-const
    let mapsize = document.getElementById('mapdb');
    mapsize.style.width = '100%';
    this.loadOverlayData();
    this.addCustomMarkers();
    // this.mapboxOverlay();
    this.addControllers();
  }
  /* Function to load data for the overlays on the mapbox */
  loadOverlayData() {
    this.mapboxServ.getOverlays().subscribe((data) => {
      this.mapboxServ.overlayArray = data;
    });
  }

  /*
  This function is used to add built in controllers in the mapbox
   */
  addControllers() {
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
  /*
  This function is used to add custom markers
   */
  addCustomMarkers() {
    this.mapboxServ.getMarkers().subscribe((data) => {
      console.log(data);
      this.mapboxServ.marker = data;
      console.log(this.mapboxServ.marker);
      this.mapboxServ.marker.forEach((m) => {
        const el = document.createElement('div');
        el.innerHTML = m.message;
        el.style.color = 'white';
        el.style.textAlign = 'center';
        el.style.fontStyle = 'bold';
        el.className = 'marker';
        const img = '/assets/icon/Residential_Plot.png';
        el.style.backgroundImage = 'url(' + img + ')';
        // el.style.borderRadius = '50%';
        // el.style.content = '123';
        el.style.width = m.iconSize[0] + 'px';
        el.style.height = m.iconSize[1] + 'px';
        new mapboxgl.Marker(el)
          .setLngLat([m.coordinates[0], m.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setText('Nabeel'))
          .addTo(this.map);
      });
    });
  }

  /*
  This function is used to add overlays on the mapbox
  */
  mapboxOverlay() {
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');
    const fit = document.getElementById('fit');
    // this.map.on('load', () => {
    // tslint:disable-next-line: no-unused-expression
    this.mapboxServ.getOverlays().subscribe((data) => {
      console.log(data);
      this.mapboxServ.overlayArray = data;

      this.mapboxServ.overlayArray.forEach((overlay) => {
        this.map.addSource(overlay.source, {
          type: 'image',
          url: overlay.url,
          coordinates: [
            [overlay.coordinates[0][0], overlay.coordinates[0][1]],
            [overlay.coordinates[1][0], overlay.coordinates[1][1]],
            [overlay.coordinates[2][0], overlay.coordinates[2][1]],
            [overlay.coordinates[3][0], overlay.coordinates[3][1]],
            // [73.026347, 33.71291], // E-9, Islamabad, Islamabad Capital Territory, Pakistan
            // [73.0439, 33.722155], // Islamabad, Islamabad Capital Territory, Pakistan
            // [73.053899, 33.70884], // Faisal Avenue Flyover Islamabad, Islamabad Capital Territory, Pakistan
            // [73.036271, 33.699548], // F-9 Islamabad, Islamabad Capital Territory, Pakistan
          ],
        });
        this.map.addLayer({
          id: overlay.source,
          source: overlay.source,
          type: 'raster',
          paint: {
            'raster-opacity': overlay.opacity,
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
            overlay.source,
            'raster-opacity',
            parseInt('' + input + '', 10) / 100
          );
          // Value indicator
          sliderValue.textContent = '' + input + '' + '%';
        });
      });
    });
    // this.map.addSource('myImageSource', {
    //   type: 'image',
    //   url: 'assets/maps/i-10-islamabad.jpg',
    //   coordinates: [
    //     [73.024955, 33.650753], // cda kashmir highway
    //     [73.041134, 33.659291], // rizvi road kashmir highway:
    //     [73.05152, 33.645466], // Service Rd West I-10 Islamabad,
    //     [73.035384, 33.636927], // I-10/3 I 10/3 I-10, Islamabad, Islamabad
    //   ],
    // });

    // this.map.addLayer({
    //   id: 'myImageSource',
    //   source: 'myImageSource',
    //   type: 'raster',
    //   paint: {
    //     'raster-opacity': 1,
    //   },
    // });
    // });
  }

  loadOverlay(id: string) {
    if (this.overlayId === '') {
      this.loadSingleMap(id);
    } else {
      console.log(this.overlayId);
      this.map.removeLayer(this.overlayId);
      this.map.removeSource(this.overlayId);
      this.loadSingleMap(id);
    }
    console.log(this.overlayId);
  }

  loadSingleMap(id: string) {
    // this.initializeMapBox();
    // this.addCustomMarkers();
    // this.mapboxOverlay();
    // this.addControllers();
    console.log(id);
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('slider-value');
    // this.map.on('load', () => {
    this.mapboxServ.getSingleOverlay(id).subscribe((data) => {
      console.log(data);
      this.mapboxServ.overlay = data;
      this.overlayId = this.mapboxServ.overlay.source;
      // if (this.overlayId) {
      //   console.log(this.overlayId);
      //   this.map.removeLayer(this.overlayId);
      //   this.map.removeSource(this.overlayId);
      // }
      console.log(this.overlayId);
      this.map.addSource(this.mapboxServ.overlay.source, {
        type: 'image',
        url: this.mapboxServ.overlay.url,
        coordinates: [
          [
            this.mapboxServ.overlay.coordinates[0][0],
            this.mapboxServ.overlay.coordinates[0][1],
          ],
          [
            this.mapboxServ.overlay.coordinates[1][0],
            this.mapboxServ.overlay.coordinates[1][1],
          ],
          [
            this.mapboxServ.overlay.coordinates[2][0],
            this.mapboxServ.overlay.coordinates[2][1],
          ],
          [
            this.mapboxServ.overlay.coordinates[3][0],
            this.mapboxServ.overlay.coordinates[3][1],
          ],
          // [73.026347, 33.71291], // E-9, Islamabad, Islamabad Capital Territory, Pakistan
          // [73.0439, 33.722155], // Islamabad, Islamabad Capital Territory, Pakistan
          // [73.053899, 33.70884], // Faisal Avenue Flyover Islamabad, Islamabad Capital Territory, Pakistan
          // [73.036271, 33.699548], // F-9 Islamabad, Islamabad Capital Territory, Pakistan
        ],
      });
      this.map.addLayer({
        id: this.mapboxServ.overlay.source,
        source: this.mapboxServ.overlay.source,
        type: 'raster',
        paint: {
          'raster-opacity': this.mapboxServ.overlay.opacity,
          'raster-fade-duration': 10,
        },
        layout: { visibility: 'visible' },
      });
      slider.addEventListener('input', (e) => {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        // e.target;
        const input = (document.getElementById('slider') as HTMLInputElement)
          .value;
        this.map.setPaintProperty(
          this.mapboxServ.overlay.source,
          'raster-opacity',
          parseInt('' + input + '', 10) / 100
        );
        // Value indicator
        sliderValue.textContent = '' + input + '' + '%';
      });
      this.fixPositionOnClick(this.mapboxServ.overlay.coordinates);
    });
    // this.map.
    // });
  }

  fixPositionOnClick(coordinates) {
    /*
    it is use to hit the location of the given four coordinates points
     */
    this.map.fitBounds([
      [coordinates[0][0], coordinates[0][1]], // cda kashmir highway
      [coordinates[2][0], coordinates[2][1]],
    ]);
    /*
    it use to center the location by taking two coordinates
    */
    // this.map.flyTo({
    //   center: [
    //     coordinates[0][0],
    //     coordinates[0][1], // cda kashmir highway
    //   ],
    //   essential: true
    // });
    // this.map.on('load', () => {
    // this.mapboxServ.overlayArray.forEach((o) => {
    //     document.getElementById('fit').addEventListener('click', () => {
    //     // });
    //   // });
    // });
  }
  /*
  This function is used to filter data
  according to Medicine Format
  */
  onSelect(event: any) {
    this.onselect = event.target.value;
    console.log(event.target.value);
    // if (this.onselect !== 'all') {
    // this.mapboxServ.getSingleOverlay(this.onselect).subscribe(
    //   (data) => {
    //     console.log(data);
    //     // this.fixPositionOnClick();
    //     this.mapboxServ.overlay = data;
    this.loadOverlay(this.onselect);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // } else {
    // this.tempMedicineArray();
    // }
  }
}
