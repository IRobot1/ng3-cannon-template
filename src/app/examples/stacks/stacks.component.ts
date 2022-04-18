import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { Vector3 } from "three";
import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { BodyProps, ShapeType } from "@angular-three/cannon";

@Component({
  selector: 'stacks-example',
  templateUrl: './stacks-example.component.html',
  providers: [NgtPhysicBody],
})
export class StacksExample {
  tetrascale = 3;

  tetravertices = [
    new Vector3(0, 0, 0),
    new Vector3(this.tetrascale, 0, 0),
    new Vector3(0, this.tetrascale, 0),
    new Vector3(0, 0, this.tetrascale),
  ]

  tetrafaces = [
    [0, 3, 2], // -x
    [0, 1, 3], // -y
    [0, 2, 1], // -z
    [1, 2, 3], // +xyz
  ]

  tetrageovertices: Array<number> = [];
  tetrageofaces: Array<number> = [];

  cubesize = 2;

  cubes: Array<NgtTriple> = [];

  private cubeshapes: Array<BodyProps & { type: ShapeType; }>

  constructor(private physicBody: NgtPhysicBody) {
    this.tetravertices.forEach(v => {
      this.tetrageovertices = this.tetrageovertices.concat(v.toArray());
    });
    this.tetrafaces.forEach(f => {
      this.tetrageofaces = this.tetrageofaces.concat(f);
    });

    this.cubes.push([0, this.cubesize, 0]);
    this.cubes.push([0, 0, 0]);
    this.cubes.push([0, -this.cubesize, 0]);
    this.cubes.push([0, -this.cubesize, -this.cubesize]);

    this.cubeshapes = this.cubes.map(position => {
      return {
        type: 'Box',
        position: position,
        args: [this.cubesize, this.cubesize, this.cubesize]
      } as BodyProps & { type: ShapeType; };
    })

  }

  sphere1Props = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [0, 10, 4],
  }));

  sphere2Props = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    position: [0, 10, 0],
  }));

  boxProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: [this.cubesize, this.cubesize, this.cubesize],
    position: [0, 10, -6],
  }));

  boxCompound1Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    shapes: this.cubeshapes,
    position: [0, 3, -5],
  }));

  boxCompound2Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    shapes: this.cubeshapes,
    position: [0, 3, 6],
  }));

  tetraProps = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.tetravertices, this.tetrafaces],
    position: [0, 1.5, 0],
  }));


}

@Component({
  templateUrl: './stacks.component.html',
})
export class StacksComponent {
}
