import { Component } from "@angular/core";

import { Color, InstancedMesh } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector:'worker-example',
  templateUrl: './worker-example.component.html',
  providers: [NgtPhysicBody],
})
export class WorkerExample {
  count = 100;
  data = new Array(this.count).fill(0).map((d, index) => ({
    position: [Math.random() - 0.5, index * 2.5 + 0.5, Math.random() - 0.5] as NgtTriple,
    color: new Color().setHex(Math.random() * 0xffffff)
  }));

  cubeProps = this.physicBody.useBox((index: number) => ({
    mass: 1,
    position: this.data[index].position,
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ready(inst: InstancedMesh) {
    this.data.forEach((item, index) => {
      inst.setColorAt(index, item.color);
    })
  }
}

@Component({
  templateUrl: './worker.component.html',
})
export class WorkerComponent {
}
