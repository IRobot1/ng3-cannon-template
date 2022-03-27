import { Component, ViewChild } from "@angular/core";

import { NgtRender, NgtTriplet } from "@angular-three/core";

import { BoxProps, GetByIndex } from "@angular-three/cannon";
import { NgtPhysicBox } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './tween.component.html'
})
export class TweenComponent {
  @ViewChild(NgtPhysicBox) box!: NgtPhysicBox;

  startz = 3;
  endz = -3;

  z = this.startz;
  speed = 2;


  getBoxProps: GetByIndex<BoxProps> = () => (
    {
      mass: 0,
      position: [0, 0.5, this.startz] as NgtTriplet,
      args: [1, 1, 1], // scale
      // missing postStep event
    }
  )

  tick({ delta }: NgtRender) {
    if (this.z > this.endz) {
      this.z -= (delta * this.speed);
      this.box.api.position.set(0, 0.5, this.z);
    }
  }

}
