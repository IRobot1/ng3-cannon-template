import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';

import { Vector3 } from 'three';

import { NgtState, NgtTriple } from '@angular-three/core';

import { NgtPhysicBody } from '@angular-three/cannon';
import { ContactMaterialOptions } from '@pmndrs/cannon-worker-api';

import { VRButton } from 'three-stdlib/webxr/VRButton';

class Cube {
  constructor(public name: string, public position: Vector3) { }
}

type XRMode = 'bat' | 'inspect';

@Component({
  selector:'vr-example',
  templateUrl: './vr-example.component.html',
  providers: [NgtPhysicBody],
})
export class VRExample implements AfterViewInit, OnDestroy {
  @Input() vr = false;
  @Input() scale = [0.5, 0.5, 0.5] as NgtTriple;
  @Input() startheight = 10;
  @Input() recycle = true;

  cubes: Array<Cube> = [];
  xrmode: XRMode = 'inspect';

  message = 'volume not triggered';

  boxProps = this.physicBody.useBox(() => ({
    mass: 0
  }));

  constructor(private physicBody: NgtPhysicBody) { }

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

@Component({
  templateUrl: './vr.component.html',
})
export class VRComponent  {
  vr = true;
  step = 1 / 60;
  gravity = -9.8;

  scale = [0.5, 0.5, 0.5] as NgtTriple;
  startheight = 10;
  recycle = true;

  concrete: ContactMaterialOptions = {
    restitution: 0, // bouncyness
    contactEquationRelaxation: 1,
    friction: 30000,
    //frictionEquationStiffness: 1e7,  // use 10 for ice
  }

  created(event: NgtState) {
    if (this.vr) {
      document.body.appendChild(VRButton.createButton(event.gl));
      this.step = 1 / 120;
      this.gravity = -2;
      this.scale = [0.1, 0.1, 0.1] as NgtTriple;
      this.startheight = 2;
      this.recycle = false;
    }
  }
}
