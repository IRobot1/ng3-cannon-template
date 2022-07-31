import { Component, ViewChild } from "@angular/core";

import { NgtRenderState } from "@angular-three/core";

import { PhysicsBoxDirective } from "../../directives/physics-box.directive";

@Component({
  selector:'tween-example',
  templateUrl: './tween-example.component.html',
})
export class TweenExample {
  @ViewChild('box') boxProps!: PhysicsBoxDirective;

  startz = 3;
  endz = -3;

  z = this.startz;
  speed = 2;

  tick({ delta }: NgtRenderState) {
    if (this.z > this.endz) {
      this.z -= (delta * this.speed);
      this.boxProps.body.api.position.set(0, 0.5, this.z);
    }
  }

}

@Component({
  templateUrl: './tween.component.html',
})
export class TweenComponent {
}
