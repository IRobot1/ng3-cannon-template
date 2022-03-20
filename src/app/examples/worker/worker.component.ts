import { Component } from "@angular/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";

@Component({
  templateUrl: './worker.component.html'
})
export class WorkerComponent {
  count = 40;

  getCubeProps(index: number): BoxProps {
    return {
      mass: 1,
      position: [Math.random() - 0.5, index * 2.5 + 0.5, Math.random() - 0.5]
    } as BoxProps;
  }

  getCubePropsThis: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      position: [Math.random() - 0.5, index * 2.5 + 0.5, Math.random() - 0.5],
      userData: this.count,
    }
  );
}
