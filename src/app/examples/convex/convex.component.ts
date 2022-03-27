import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BoxProps, ConvexPolyhedronProps, CylinderProps, GetByIndex, PlaneProps, SphereProps } from "@angular-three/cannon";
import { Vector3 } from "three";
import { NgtBoxGeometry } from "@angular-three/core/geometries";

@Component({
  templateUrl: './convex.component.html'
})
export class ConvexComponent {
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

  wall: Array<NgtTriplet> = [];

  constructor() {
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
        this.wall.push([3, size * j + size * 1.2, -(size * i + 0.01) - 3])
      }
    }
  }

  getTetraProps: GetByIndex<ConvexPolyhedronProps> = (index: number) => (
    {
      mass: 1,
      args: [this.tetravertices, this.tetrafaces]
    }
  )

  boxvertices: Array<Vector3> = []
  boxfaces: Array<Array<number>> = []
  boxnormals: Array<Vector3> = []


  getConvexBoxProps: GetByIndex<ConvexPolyhedronProps> = (index: number) => (
    {
      mass: 1,
      args: [this.boxvertices, this.boxfaces, this.boxnormals],
    }
  )

  getBoxProps(): BoxProps {
    return {
      mass: 1,
      args: [1, 1, 1]
    } as BoxProps;
  }

  getCylinderProps(): CylinderProps {
    return {
      mass: 1,
      args: [0.5, 0.5, 2]
    } as CylinderProps;
  }

  // Access to underlying Cannon object not supported by @angular-three/cannon
  //
  //  createBoxPolyhedron(size = 1) 
  //    const box = new CANNON.Box(new CANNON.Vec3(size, size, size))
  //    return box.convexPolyhedronRepresentation
  //
  // Instead use data from geometry to build matching physics properties, but normals are not compatible
  //

  ready(box: NgtBoxGeometry) {
    //console.warn(box.geometry)

    // convert box vertices to format needed for physics
    const vertices = box.geometry.attributes['position']
    for (let i = 0; i < vertices.count; i++) {
      this.boxvertices.push(new Vector3(vertices.getX(i), vertices.getY(i), vertices.getZ(i)))
    }

    const faces = box.geometry.index;
    if (faces) {
      // convert box index into faces needed for physics
      for (let i = 0; i < faces.count / 3; i++) {
        this.boxfaces.push([faces.getX(i), faces.getY(i), faces.getZ(i)]);
      }
    }

    // convert box normals to format needed by physics - not working correctly
    const normals = box.geometry.attributes['normal']
    for (let i = 0; i < normals.count; i++) {
      this.boxnormals.push(new Vector3(normals.getX(i), normals.getY(i), normals.getZ(i)))
    }
  }

}
