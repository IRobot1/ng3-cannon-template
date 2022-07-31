import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";


class JengaBlock {
  constructor(public position: NgtTriple, public scale: NgtTriple, public color: string) { }
}

@Component({
  selector: 'jenga-example',
  templateUrl: './jenga-example.component.html',
})
export class JengaExample {
  blocks: Array<JengaBlock> = [];

  constructor() {
    const size = 1
    const gap = 0.1

    const colors = ['white', 'red', 'white'];

    // Layers
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {

        let halfExtents: NgtTriple
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

        const position = [
          (size + gap) * (j - 1) * dx,
          (size + gap) * (i + 1),
          (size + gap) * (j - 1) * dz
        ] as NgtTriple

        this.blocks.push(new JengaBlock(position, halfExtents, colors[j]));
      }
    }
  }
}

@Component({
  templateUrl: './jenga.component.html',
})
export class JengaComponent {
}
