import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  navigate() {
    this.router.navigate(['mapbox']);
  }
  navigatedb() {
    this.router.navigate(['mapboxdb']);
  }
  navigateComplex(){
    this.router.navigate(['mapboxcomplex']);
  }
}
