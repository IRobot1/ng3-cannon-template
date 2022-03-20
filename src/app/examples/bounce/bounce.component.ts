import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { PlaneProps, SphereProps } from "@angular-three/cannon";

@Component({
  templateUrl: './bounce.component.html'
})
export class BounceComponent {
  getPlaneProps(): PlaneProps {
    return {
      material: { restitution: 1 },
    } as SphereProps;
  }

  getSphere1Props(): SphereProps {
    return {
      mass: 1,
      position: [-3, 5, 3] as NgtTriplet,
      material: { restitution: 0.4 },
    } as SphereProps;
  }

  getSphere2Props(): SphereProps {
    return {
      mass: 1,
      position: [-3, 5, 0] as NgtTriplet,
      material: { restitution: 0.6 },
    } as SphereProps;
  }

  getSphere3Props(): SphereProps {
    return {
      mass: 1,
      position: [-3, 5, -3] as NgtTriplet,
      material: { restitution: 0.8 },
    } as SphereProps;
  }
}
