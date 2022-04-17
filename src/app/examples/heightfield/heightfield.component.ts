import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { BufferGeometry, Vector3 } from "three";
import { NgtVector3 } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './heightfield.component.html',
  providers: [NgtPhysicBody],
})
export class HeightfieldComponent implements AfterViewInit {

  position!: NgtVector3;
  buffergeometry!: BufferGeometry;
  elementSize = 1;

  spheres: Array<NgtVector3> = []; // positions

  private matrix: Array<Array<number>> = [];


  constructor(private physicBody: NgtPhysicBody) {
    const sizeX = 15
    const sizeZ = 15
    for (let i = 0; i < sizeX; i++) {
      this.matrix.push([])
      for (let j = 0; j < sizeZ; j++) {
        if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeZ - 1) {
          this.matrix[i].push(3)
          continue
        }

        const height = Math.cos((i / sizeX) * Math.PI * 2) * Math.cos((j / sizeZ) * Math.PI * 2) + 2
        this.matrix[i].push(height)
      }
    }

    this.position = new Vector3(0, 0, 7.5)

    // Add spheres
    for (let i = 0; i < sizeX - 1; i++) {
      for (let j = 0; j < sizeZ - 1; j++) {
        if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeZ - 2) {
          continue
        }

        let position = new Vector3(1 + i + 0.25, 5, -j + 0.25 - 1.5);
        this.spheres.push(position.add(this.position));
      }
    }
  }
  ngAfterViewInit(): void {

  }

  hfProps = this.physicBody.useHeightfield(() => ({
    mass: 0,
    args: [this.matrix, { elementSize: this.elementSize }],
  }));

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 1,
      args: [0.1]
  }));


  //heightfieldGeometry(shape): Geometry {
  //  const geometry = new Geometry()

  //  const v0 = new CANNON.Vec3()
  //  const v1 = new CANNON.Vec3()
  //  const v2 = new CANNON.Vec3()
  //  for (let xi = 0; xi < shape.data.length - 1; xi++) {
  //    for (let yi = 0; yi < shape.data[xi].length - 1; yi++) {
  //      for (let k = 0; k < 2; k++) {
  //        shape.getConvexTrianglePillar(xi, yi, k === 0)
  //        v0.copy(shape.pillarConvex.vertices[0])
  //        v1.copy(shape.pillarConvex.vertices[1])
  //        v2.copy(shape.pillarConvex.vertices[2])
  //        v0.vadd(shape.pillarOffset, v0)
  //        v1.vadd(shape.pillarOffset, v1)
  //        v2.vadd(shape.pillarOffset, v2)
  //        geometry.vertices.push(
  //          new THREE.Vector3(v0.x, v0.y, v0.z),
  //          new THREE.Vector3(v1.x, v1.y, v1.z),
  //          new THREE.Vector3(v2.x, v2.y, v2.z)
  //        )
  //        const i = geometry.vertices.length - 3
  //        geometry.faces.push(new THREE.Face3(i, i + 1, i + 2))
  //      }
  //    }
  //  }

  //  geometry.computeBoundingSphere()

  //  if (flatShading) {
  //    geometry.computeFaceNormals()
  //  } else {
  //    geometry.computeVertexNormals()
  //  }

  //  return geometry
  //}
}
