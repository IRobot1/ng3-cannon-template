import { Component, ViewChild } from "@angular/core";

import { Color, InstancedMesh } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { NgtInstancedMesh } from "@angular-three/core/meshes";

@Component({
  templateUrl: './worker.component.html',
  providers: [NgtPhysicBody],
})
export class WorkerComponent {
  @ViewChild(NgtInstancedMesh) inst!: NgtInstancedMesh;

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

  ready() {
    this.data.forEach((item, index) => {
      this.inst.instance.value.setColorAt(index, item.color);
    })
  }
}
