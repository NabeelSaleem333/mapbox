import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapboxdbService {
  // Objects
  // Arrays
  marker: Marker[];
  overlayArray: Overlay[];
  overlay: Overlay;


  constructor(private httpclient: HttpClient) {}

  public getMarkers(): Observable<any> {
    return this.httpclient.get('http://localhost:2000/api/marker');
  }

  public getOverlays(): Observable<any> {
    return this.httpclient.get('http://localhost:2000/api/overlay');
  }

  public getSingleOverlay(id: string): Observable<any> {
    return this.httpclient.get(`http://localhost:2000/api/overlay/${id}`);
  }
}

export class Marker {
  // tslint:disable-next-line: variable-name
  _id: string;
  coordinates: Array<number>;
  message: string;
  iconSize: Array<number>;
  pin: string;
}
export class Overlay {
  // tslint:disable-next-line: variable-name
  _id: string;
  source: string;
  url: string;
  opacity: number;
  coordinates: Array<number>;
}
