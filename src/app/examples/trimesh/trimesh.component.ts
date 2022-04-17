import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";
import { NgtTorusGeometry } from "@angular-three/core/geometries";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { ViewChild } from "@angular/core";

@Component({
  templateUrl: './trimesh.component.html',
  providers: [NgtPhysicBody],
})
export class TrimeshComponent {
  @ViewChild(NgtTorusGeometry) torus!: NgtTorusGeometry;

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [0, 5, 0] as NgtTriple,
    material: { restitution: 0.4 },
    args: [0.5],
    velocity: [1, 1, 0]
  }));

  vertices!: ArrayLike<number>;
  indices!: ArrayLike<number>;

  trimeshProps = this.physicBody.useTrimesh(() => ({
    mass: 1,
    position: [0, 1.5, 0] as NgtTriple,
    args: [this.vertices, this.indices]
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ready() {
    // TODO geometry
  //  this.vertices = this.torus.geometry.attributes['position'].array
  //  if (this.torus.geometry.index) {
  //    this.indices = this.torus.geometry.index.array;
  //  }
  }
}
