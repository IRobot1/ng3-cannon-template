import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";

class JengaBlock {
  constructor(public position: NgtTriplet, public scale: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './jenga.component.html'
})
export class JengaComponent {
  blocks: Array<JengaBlock> = [];

  constructor() {
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
          halfExtents = [size, size, size * 3] as NgtTriplet
          dx = 1
          dz = 0
        } else {
          halfExtents = [size * 3, size, size] as NgtTriplet
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

  getBoxProps: GetByIndex<BoxProps> = () => (
    {
      mass: 1,
      args: this.blocks[this.index].scale,
      sleepTimeLimit: 0.1,
      sleepSpeedLimit: 0.1,
    }
  )


}
