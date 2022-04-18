import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector:'threejs-example',
  templateUrl: './threejs-example.component.html',
  providers: [NgtPhysicBody],
})
export class ThreeJSExample {
  cubeProps = this.physicBody.useBox(() => ({
    mass: 1,
    angularVelocity: [0, 10, 0],
    angularDamping: 0.5,
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}


@Component({
  templateUrl: './threejs.component.html',
})
export class ThreeJSComponent {
}
