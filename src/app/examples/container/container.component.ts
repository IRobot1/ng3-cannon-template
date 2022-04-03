import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { DefaultContactMaterial } from "@angular-three/cannon/lib/models/default-contact-material";
import { GetByIndex, PlaneProps, SphereProps } from "@angular-three/cannon";

class ContainerSphere {
  constructor(public position: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  stone: DefaultContactMaterial = {
    friction: 0.3,
    restitution: 0.2,
  }

  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  wallsize = 10;
  floorsize = 100;

  constructor() {
    let nx = 4;
    let ny = 4;
    let nz = 12;
    let heightOffset = 0;
    let randRange = 0.1;

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        for (let k = 0; k < nz; k++) {
          this.spheres.push(new ContainerSphere(
            [
              -(i * 2 - nx * 0.5 + (Math.random() - 0.5) * randRange),
              1 + k * 2.1 + heightOffset,
              j * 2 - ny * 0.5 + (Math.random() - 0.5) * randRange
            ], '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0')));
        }
      }
    }
  }

  getPlaneProps: GetByIndex<PlaneProps> = (index: number) => (
    {
      material: { restitution: 1 },
      args: [this.floorsize, this.floorsize]
    }
  );

  getWallProps: GetByIndex<PlaneProps> = (index: number) => (
    {
      args: [this.wallsize, this.wallsize]
    }
  );

  getSphereProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 1,
      args: [this.spheresize],
      material: {
        friction: 0.3,
        restitution: 0.2,
      },
      allowSleep: true,
      sleepTimeLimit: 0.1,
      sleepSpeedLimit: 0.1,
    }
  )
}
