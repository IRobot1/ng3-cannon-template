import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';

import { Vec3 } from 'cannon-es';

class Cube {
  constructor(public name: string, public position: Vec3) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  cubes: Array<Cube> = [];
  message = 'volume not triggered';

  ngAfterViewInit(): void {
    let count = 0;
    setInterval(() => {
      if (this.cubes.length > 29) {
        this.cubes.splice(0, 1);
      }
      this.cubes.push(new Cube('cube' + count.toString(), new Vec3(0, 20, Math.random())));
      count++;
    }, 500);
  }
}
