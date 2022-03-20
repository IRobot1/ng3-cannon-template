import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";

@Component({
  templateUrl: './worker.component.html'
})
export class WorkerComponent {
  cubes: Array<NgtTriplet> = [];

  private N = 40;

  constructor() {
    for (let i = 0; i < this.N; i++) {
      this.cubes.push([Math.random() - 0.5, i * 2.5 + 0.5, Math.random() - 0.5])
    }
  }

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: 1,
  });


}
