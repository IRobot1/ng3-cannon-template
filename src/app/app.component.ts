import { DefaultContactMaterial } from '@angular-three/cannon/lib/models/default-contact-material';
import { NgtCreatedState } from '@angular-three/core';
import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';

import { Vec3 } from 'cannon-es';

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

class Cube {
  constructor(public name: string, public position: Vec3) { }
}

type XRMode = 'bat' | 'inspect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  cubes: Array<Cube> = [];
  message = 'volume not triggered';
  vr = true;
  xrmode: XRMode = 'inspect';

  scale = 0.5;
  step = 1 / 60;
  gravity = -9.8;

  private startheight = 10;

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
      this.step = 1 / 120;
      this.gravity = -2;
      this.startheight = 2;
    }
  }

  ngAfterViewInit(): void {
    let count = 0;
    setInterval(() => {
      if (this.cubes.length > 100) {
        this.cubes.splice(0, 1);
      }
      this.cubes.push(new Cube('cube' + count.toString(), new Vec3(0, this.startheight, Math.random())));
      count++;
    }, 500);
  }
}
