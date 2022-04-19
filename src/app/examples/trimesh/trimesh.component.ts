import { Component } from "@angular/core";

import { TorusGeometry } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'trimesh-example',
  templateUrl: './trimesh-example.component.html',
  providers: [NgtPhysicBody],
})
export class TrimeshExample {

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 1,
    position: [0, 5, 0.1] as NgtTriple,
    material: { restitution: 0.4 },
    args: [0.5],
    velocity: [1, 1, 0]
  }));

  vertices!: ArrayLike<number>;
  indices!: ArrayLike<number>;

  position = [0, 1.5, 0] as NgtTriple;
  rotation = [-1.57, 0, 0] as NgtTriple;

  trimeshProps = this.physicBody.useTrimesh(() => ({
    mass: 1,
    position: this.position,
    args: [this.vertices, this.indices],
    rotation: this.rotation
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ready(torus: TorusGeometry) {
      this.vertices = torus.attributes['position'].array
      if (torus.index) {
        this.indices = torus.index.array;
      }
  }
}

@Component({
  templateUrl: './trimesh.component.html',
})
export class TrimeshComponent {
}
