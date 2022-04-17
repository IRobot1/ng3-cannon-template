import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

class JengaBlock {
  constructor(public position: NgtTriple, public scale: NgtTriple, public color: string) { }
}

@Component({
  templateUrl: './jenga.component.html',
  providers: [NgtPhysicBody],
})
export class JengaComponent {
  blocks: Array<JengaBlock> = [];

  constructor(private physicBody: NgtPhysicBody) {
    const size = 1
    const gap = 0.1

    const colors = ['white', 'red', 'white'];

    // Layers
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {

        let halfExtents
        let dx
        let dz
        if (i % 2 === 0) {
          halfExtents = [size, size, size * 3] as NgtTriple
          dx = 1
          dz = 0
        } else {
          halfExtents = [size * 3, size, size] as NgtTriple
          dx = 0
          dz = 1
        }

        this.blocks.push(new JengaBlock([
          (size + gap) * (j - 1) * dx,
          (size + gap) * (i + 1),
          (size + gap) * (j - 1) * dz
        ], halfExtents, colors[j]));
      }
    }
  }

  index = 0;

  ready(index: number) {
    this.index = index;
  }

  boxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.blocks[this.index].scale,
    sleepTimeLimit: 0.1,
    sleepSpeedLimit: 0.1,
  }));
}
