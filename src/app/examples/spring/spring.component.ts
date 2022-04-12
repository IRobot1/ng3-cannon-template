import { Component } from "@angular/core";

import { BoxProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { NgtTriplet } from "@angular-three/core";
import { NgtPhysicLockConstraint } from "@angular-three/cannon/constraints";

@Component({
  templateUrl: './spring.component.html'
})
export class SpringComponent {
  size = 1;

  options: Record<string, any> = {
    localAnchorA: [-this.size, this.size, 0] as NgtTriplet,
    localAnchorB: [0, 0, 0] as NgtTriplet,
    restLength: 0,
    stiffness: 50,
    damping: 1,
  }

  getSphereProps(): SphereProps {
    return {
      mass: 0,
      args: [0.1],
    } as SphereProps;
  }

  getBoxProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      args: [this.size * 0.3, this.size, this.size] as NgtTriplet,
    }
  )

  ready(spring: NgtPhysicLockConstraint) {
    //spring.api.applyForce();
  }
}
