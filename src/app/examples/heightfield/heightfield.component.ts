import { Component } from "@angular/core";

import { Vector3 } from "three";

import { NgtPhysicBody } from "@angular-three/cannon";
import { make, NgtTriple } from "@angular-three/core";

@Component({
  selector: 'heightfield-example',
  templateUrl: 'heightfield-example.component.html',
  providers: [NgtPhysicBody],
})
export class HeightfieldExample {

  spheresize = 0.2;
  spheres: Array<NgtTriple> = [];

  heights: Array<Array<number>> = [];
  elementSize = 1;

  position: NgtTriple = [-7.5, 0, 7.5];

  constructor(private physicBody: NgtPhysicBody) {
    const sizeX = 15
    const sizeZ = 15
    for (let i = 0; i < sizeX; i++) {
      this.heights.push([])
      for (let j = 0; j < sizeZ; j++) {
        if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeZ - 1) {
          this.heights[i].push(3)
          continue
        }

        const height = Math.cos((i / sizeX) * Math.PI * 2) * Math.cos((j / sizeZ) * Math.PI * 2) + 2
        this.heights[i].push(height)
      }
    }

    const position = make(Vector3, this.position);

    // Add spheres
    for (let i = 0; i < sizeX - 1; i++) {
      for (let j = 0; j < sizeZ - 1; j++) {
        if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeZ - 2) {
          continue
        }

        this.spheres.push(new Vector3(i + 0.25, 3, -j + 0.25 - 1).add(position).toArray());
      }
    }
  }

  hfProps = this.physicBody.useHeightfield(() => ({
    mass: 0,
    // https://pmndrs.github.io/cannon-es/docs/classes/Heightfield.html#constructor
    args: [this.heights, { elementSize: this.elementSize }],
    rotation: [-1.57, 0, 0],
    position: this.position,
  }));

}

@Component({
  templateUrl: './heightfield.component.html',
})
export class HeightfieldComponent {
}
