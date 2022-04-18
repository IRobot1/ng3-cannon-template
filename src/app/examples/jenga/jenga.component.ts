import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

class JengaBlock {
  constructor(public body: NgtPhysicBodyReturn, public scale: NgtTriple, public color: string) { }
}

@Component({
  selector: 'jenga-example',
  templateUrl: './jenga-example.component.html',
  providers: [NgtPhysicBody],
})
export class JengaExample {
  blocks: Array<JengaBlock> = [];

  constructor(private physicBody: NgtPhysicBody) {
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

        const body = this.physicBody.useBox(() => ({
          mass: 1,
          args: halfExtents,
          position: position,
          sleepTimeLimit: 0.1,
          sleepSpeedLimit: 0.1,
        }));

        this.blocks.push(new JengaBlock(body, halfExtents, colors[j]));
      }
    }
  }
}

@Component({
  templateUrl: './jenga.component.html',
})
export class JengaComponent {
}
