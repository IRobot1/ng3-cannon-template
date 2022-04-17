import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { Vector3 } from 'three';

import { NgtState, NgtTriple } from '@angular-three/core';

import { VRButton } from 'three-stdlib/webxr/VRButton';
import { NgtPhysicBody } from '@angular-three/cannon/bodies';
import { ContactMaterialOptions } from '@pmndrs/cannon-worker-api';


class Cube {
  constructor(public name: string, public position: Vector3) { }
}

type XRMode = 'bat' | 'inspect';

@Component({
  templateUrl: './vr.component.html',
  providers: [NgtPhysicBody],
})
export class VRComponent implements AfterViewInit, OnDestroy {
  cubes: Array<Cube> = [];
  message = 'volume not triggered';
  vr = true;
  xrmode: XRMode = 'inspect';

  scale = [0.5, 0.5, 0.5] as NgtTriple;
  step = 1 / 60;
  gravity = -9.8;

  private startheight = 10;
  private recycle = true;

  // TODO material
  concrete: ContactMaterialOptions  = {
    restitution: 0, // bouncyness
    contactEquationRelaxation: 1,
    friction: 30000,
    //frictionEquationStiffness: 1e7,  // use 10 for ice
  }

  boxProps = this.physicBody.useBox(() => ({
    mass: 0
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  created(event: NgtState) {
    if (this.vr) {
      document.body.appendChild(VRButton.createButton(event.gl));
      this.scale = [0.1, 0.1, 0.1] as NgtTriple;
      this.step = 1 / 120;
      this.gravity = -2;
      this.startheight = 2;
      this.recycle = false;
    }
  }

  private timer!: any;

  ngAfterViewInit(): void {
    let count = 0;
    this.timer = setInterval(() => {
      if (this.cubes.length < 29) {
        this.cubes.push(new Cube('cube' + count.toString(), new Vector3(0, this.startheight, Math.random())));
      }
      else if (this.recycle) {
        const position = this.cubes[count].position;
        position.x = 0;
        position.y = this.startheight;
        position.z = Math.random();
        if (count < this.cubes.length-1) {
          count++;
        }
        else {
          count = 0;
        }
      }

    }, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
