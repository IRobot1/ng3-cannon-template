import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";


@Component({
  templateUrl: './hinge.component.html'
})
export class HingeComponent {
  size = 5;

  scale = [this.size * 0.1, this.size * 0.5, this.size * 0.5] as NgtTriplet;

  options: Record<string, any> = {
    pivotA: [0, -1.5, 0],
    axisA: [0, 0, -1],
    pivotB: [0, 1.5, 0],
    axisB: [0, 0, -1],
  }

  getStaticProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 0,
      args: this.scale,
    }
  )

  getHingeProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      args: this.scale,
      angularDamping: 0.1
    }
  )


}
