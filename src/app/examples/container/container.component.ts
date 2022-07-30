import { Component } from "@angular/core";

import { Color } from "three";
import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";
import { ContactMaterialOptions } from "@pmndrs/cannon-worker-api";

class ContainerSphere {
  constructor(public position: NgtTriple, public color: Color) { }
}

@Component({
  selector: 'container-example',
  templateUrl:'container-example.component.html',
  providers: [NgtPhysicBody],
})
export class ContainerExample {
  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  constructor(private physicBody: NgtPhysicBody) {
    let nx = 4;
    let ny = 4;
    let nz = 12;
    let heightOffset = 0;
    let randRange = 0.1;

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        for (let k = 0; k < nz; k++) {
          const position = [
            -(i * 2 - nx * 0.5 + (Math.random() - 0.5) * randRange),
            1 + k * 2.1 + heightOffset,
            j * 2 - ny * 0.5 + (Math.random() - 0.5) * randRange
          ] as NgtTriple;

          this.spheres.push(new ContainerSphere(position, new Color().setHex(Math.random() * 0xffffff)));
        }
      }
    }
  }

  wall1Props = this.physicBody.usePlane(() => ({
    position: [0, 5, -5]
  }));
  wall2Props = this.physicBody.usePlane(() => ({
    position: [0, 5, 5],
    rotation: [3.14, 0, 0]
  }));
  wall3Props = this.physicBody.usePlane(() => ({
    position: [-5, 5, 0],
    rotation: [0, 1.57, 0]
  }));
  wall4Props = this.physicBody.usePlane(() => ({
    position: [5, 5, 0],
    rotation: [0, -1.57, 0]
  }));


}

@Component({
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  stone: ContactMaterialOptions = {
    friction: 0.3,
    restitution: 0.2,
  }
}
