import { DefaultContactMaterial } from '@angular-three/cannon/lib/models/default-contact-material';
import { NgtCreatedState } from '@angular-three/core';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';

import { Vec3 } from 'cannon-es';

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

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
  vr = false;
  scale = 1;
  concrete: DefaultContactMaterial = {
    restitution: 0, // bouncyness
    contactEquationRelaxation: 1,
    friction: 30000,
    //frictionEquationStiffness: 1e7,  // use 10 for ice
  }

  created(event: NgtCreatedState) {
    if (this.vr) {
      document.body.appendChild(VRButton.createButton(event.renderer));
      this.scale = 0.1;
    }
  }

  ngAfterViewInit(): void {
    let count = 0;
    setInterval(() => {
      if (this.vr) {
        if (this.cubes.length < 100) {
          this.cubes.push(new Cube('cube' + count.toString(), new Vec3(0, 2, Math.random())));
        }
      } else {
        if (this.cubes.length > 29) {
          this.cubes.splice(0, 1);
        }
        this.cubes.push(new Cube('cube' + count.toString(), new Vec3(0, 20, Math.random())));
      }
      count++;
    }, 500);
  }
}
