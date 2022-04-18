import { Component } from "@angular/core";

import { NgtRenderState, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector:'tween-example',
  templateUrl: './tween-example.component.html',
  providers: [NgtPhysicBody],
})
export class TweenExample {
  startz = 3;
  endz = -3;

  z = this.startz;
  speed = 2;

  boxProps = this.physicBody.useBox(() => ({
      mass: 0,
      position: [0, 0.5, this.startz] as NgtTriple,
      args: [1, 1, 1], // scale
      // missing postStep event
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  tick({ delta }: NgtRenderState) {
    if (this.z > this.endz) {
      this.z -= (delta * this.speed);
      this.boxProps.api.position.set(0, 0.5, this.z);
    }
  }

}

@Component({
  templateUrl: './tween.component.html',
})
export class TweenComponent {
}
