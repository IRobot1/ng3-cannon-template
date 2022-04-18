import { Component } from "@angular/core";

import { Color, InstancedMesh } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { Matrix4 } from "three";

@Component({
  selector: 'performance-example',
  templateUrl: './performance-example.component.html',
  providers: [NgtPhysicBody],
})
export class PerformanceExample {
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
    const matrix = new Matrix4()

    for (let i = 0; i < this.count; i++) {
      inst.setColorAt(i, new Color().setHex(Math.random() * 0xffffff));
      const position = this.boxes[i];
      matrix.setPosition(position[0], position[1], position[2]);
      inst.setMatrixAt(i, matrix);
    }
  }

  tick() {
    const index = Math.floor(Math.random() * this.count)
    const props = this.cubeProps.api.at(index);
    if (props) {
      props.position.set(0, 5 + Math.random() * 15, 0);
    }
  }
}

@Component({
  templateUrl: './performance.component.html',
})
export class PerformanceComponent {
}
