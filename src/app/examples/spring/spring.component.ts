import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './spring.component.html',
  providers: [NgtPhysicBody],
})
export class SpringComponent {
  size = 1;

  options: Record<string, any> = {
    localAnchorA: [-this.size, this.size, 0] as NgtTriple,
    localAnchorB: [0, 0, 0] as NgtTriple,
    restLength: 0,
    stiffness: 50,
    damping: 1,
  }

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 0,
      args: [0.1],
  }));

  boxProps = this.physicBody.useBox(() => ({
      mass: 1,
      args: [this.size * 0.3, this.size, this.size] as NgtTriple,
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ready() {
    //spring.api.applyForce();
  }
}
