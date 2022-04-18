import { Component } from "@angular/core";

import { BoxGeometry, Vector3 } from "three";

import { NgtRadianPipe, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

class Cube {
  constructor(public body: NgtPhysicBodyReturn) { }
}

@Component({
  selector: 'convex-example',
  templateUrl: './convex-example.component.html',
  providers: [NgtPhysicBody],
})
export class ConvexExample {
  tetravertices = [
    new Vector3(0, 0, 0),
    new Vector3(1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 0, 1),
  ]

  tetrafaces = [
    [0, 3, 2], // -x
    [0, 1, 3], // -y
    [0, 2, 1], // -z
    [1, 2, 3], // +xyz
  ]

  tetrageovertices: Array<number> = [];
  tetrageofaces: Array<number> = [];

  cubes: Array<Cube> = [];

  constructor(private physicBody: NgtPhysicBody) {
    this.tetravertices.forEach(v => {
      this.tetrageovertices = this.tetrageovertices.concat(v.toArray());
    });
    this.tetrafaces.forEach(f => {
      this.tetrageofaces = this.tetrageofaces.concat(f);
    });

    const size = 1;
    // calculate positions for wall
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const position = [3, size * j + size * 1.2, -(size * i + 0.01) - 3] as NgtTriple;
        const body = this.physicBody.useBox(() => ({
          mass: 1,
          args: [1, 1, 1],
          position: position,
        }));
        this.cubes.push(new Cube(body));
      }
    }
  }

  private rad10 = new NgtRadianPipe().transform(10);

  tetra1Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.tetravertices, this.tetrafaces],
    rotation: [this.rad10, 0, 0],
    position: [3, 1.5, 3]
  }));
  tetra2Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.tetravertices, this.tetrafaces],
    rotation: [this.rad10, 0, 0],
    position: [3, 3, 3]
  }));

  boxvertices: Array<Vector3> = []
  boxfaces: Array<Array<number>> = []
  boxnormals: Array<Vector3> = []


  convex1Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.boxvertices, this.boxfaces, this.boxnormals],
    rotation: [this.rad10, 0, 0],
    position: [0, 1.5, 1]
  }));
  convex2Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.boxvertices, this.boxfaces, this.boxnormals],
    rotation: [this.rad10, 0, 0],
    position: [3, 1.5, 0]
  }));
  convex3Props = this.physicBody.useConvexPolyhedron(() => ({
    mass: 1,
    args: [this.boxvertices, this.boxfaces, this.boxnormals],
    rotation: [this.rad10, 0, 0],
    position: [3, 3, 0]
  }));

  cylinderProps = this.physicBody.useCylinder(() => ({
    mass: 1,
    args: [0.5, 0.5, 2],
    rotation: [1.57, 0, 0],
    position: [0, 5, 0]
  }));

  // Access to underlying Cannon object not supported by @angular-three/cannon
  //
  //  createBoxPolyhedron(size = 1) 
  //    const box = new CANNON.Box(new CANNON.Vec3(size, size, size))
  //    return box.convexPolyhedronRepresentation
  //
  // Instead use data from geometry to build matching physics properties, but normals are not compatible
  //

  ready(box: BoxGeometry) {

    // convert box vertices to format needed for physics
    const vertices = box.attributes['position']
    for (let i = 0; i < vertices.count; i++) {
      this.boxvertices.push(new Vector3(vertices.getX(i), vertices.getY(i), vertices.getZ(i)))
    }

    const faces = box.index;
    if (faces) {
      // convert box index into faces needed for physics
      for (let i = 0; i < faces.count / 3; i++) {
        this.boxfaces.push([faces.getX(i), faces.getY(i), faces.getZ(i)]);
      }
    }

    // convert box normals to format needed by physics - not working correctly
    const normals = box.attributes['normal']
    for (let i = 0; i < normals.count; i++) {
      this.boxnormals.push(new Vector3(normals.getX(i), normals.getY(i), normals.getZ(i)))
    }
  }

}

@Component({
  templateUrl: './convex.component.html',
})
export class ConvexComponent {
}
