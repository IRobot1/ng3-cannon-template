import { Component } from "@angular/core";

import { Color, InstancedMesh } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './performance.component.html',
  providers: [NgtPhysicBody],
})
export class PerformanceComponent {
  count = 400;

  private boxes: Array<NgtTriple> = []

  constructor(private physicBody: NgtPhysicBody) {
    for (let i = 0; i < this.count; i++) {
      // start with random positions
      this.boxes.push([
        (Math.random() * 2 - 1) * 5,
        Math.random() * 10,
        (Math.random() * 2 - 1) * 5
      ])
    }
  }

  cubeProps = this.physicBody.useBox((index: number) => ({
      mass: 1,
      position: this.boxes[index],
      args: [1, 1, 1],
  }));

  ready(inst: InstancedMesh) {
    for (let i = 0; i < this.count; i++) {
      inst.setColorAt(i, new Color().setHex(Math.random() * 0xffffff));
    }
  }

  tick() {
    const index = Math.floor(Math.random() * this.count)
    this.cubeProps.api.at(index).position.set(0, 5 + Math.random() * 15, 0);
  }
}
