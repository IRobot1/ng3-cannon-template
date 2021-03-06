import { Component } from "@angular/core";

import { Object3D, Vector3 } from "three";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";

@Component({
  selector: 'heightfield-example',
  templateUrl: 'heightfield-example.component.html',
  providers: [NgtPhysicBody],
})
export class HeightfieldExample {

  spheresize = 0.2;
  spheres: Array<NgtPhysicBodyReturn<Object3D>> = [];

  heights: Array<Array<number>> = [];
  elementSize = 1;

  private position!: Vector3;

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

    this.position = new Vector3(0, 0, 7.5)

    // Add spheres
    for (let i = 0; i < sizeX - 1; i++) {
      for (let j = 0; j < sizeZ - 1; j++) {
        if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeZ - 2) {
          continue
        }

        let position = new Vector3(i + 0.25, 3, -j + 0.25 - 1).add(this.position);
        const body = this.physicBody.useSphere(() => ({
          mass: 1,
          args: [this.spheresize],
          position: [position.x, position.y, position.z]
        }));

        this.spheres.push(body);
      }
    }
  }

  hfProps = this.physicBody.useHeightfield(() => ({
    mass: 0,
    // https://pmndrs.github.io/cannon-es/docs/classes/Heightfield.html#constructor
    args: [this.heights, { elementSize: this.elementSize }],
    rotation: [-1.57, 0, 0],
    position: [this.position.x, this.position.y, this.position.z],
  }));

}

@Component({
  templateUrl: './heightfield.component.html',
})
export class HeightfieldComponent {
}
