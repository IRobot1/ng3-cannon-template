import { Component } from "@angular/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtTriplet } from "@angular-three/core";
import { Color, InstancedMesh } from "three";

@Component({
  templateUrl: './worker.component.html'
})
export class WorkerComponent {
  count = 100;
  data = new Array(this.count).fill(0).map((d, index) => ({
    position: [Math.random() - 0.5, index * 2.5 + 0.5, Math.random() - 0.5] as NgtTriplet,
    color: new Color().setHex(Math.random() * 0xffffff)
  }));

  getCubeProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      position: this.data[index].position,
    }
  );

  ready(inst: InstancedMesh) {
    this.data.forEach((item, index) => {
      inst.setColorAt(index, item.color);
    })
  }
}
