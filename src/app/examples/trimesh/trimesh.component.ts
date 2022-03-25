import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";
import { NgtTorusGeometry } from "@angular-three/core/geometries";

import { GetByIndex, PlaneProps, SphereProps, TrimeshProps } from "@angular-three/cannon";

@Component({
  templateUrl: './trimesh.component.html'
})
export class TrimeshComponent {
  getPlaneProps(): PlaneProps {
    return {
      material: { restitution: 1 },
    } as PlaneProps;
  }

  getSphereProps(): SphereProps {
    return {
      mass: 1,
      position: [0, 5, 0] as NgtTriplet,
      material: { restitution: 0.4 },
      args: [0.5],
      velocity: [1, 1, 0]
    } as SphereProps;
  }

  vertices!: ArrayLike<number>;
  indices!: ArrayLike<number>;

  getTrimeshProps: GetByIndex<TrimeshProps> = () => (
    {
      mass: 1,
      position: [0, 1.5, 0] as NgtTriplet,
      args: [this.vertices, this.indices]
    }
  )

  ready(torus: NgtTorusGeometry) {
    this.vertices = torus.geometry.attributes['position'].array
    if (torus.geometry.index) {
      this.indices = torus.geometry.index.array;
    }
  }
}
