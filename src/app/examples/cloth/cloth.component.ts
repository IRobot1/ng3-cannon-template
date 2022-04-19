import { Component } from "@angular/core";

import { NgtLoader, NgtRenderState, NgtTriple } from "@angular-three/core";

import { BufferGeometry, DoubleSide, Float32BufferAttribute, MeshStandardMaterialParameters, Texture, TextureLoader, Vector3 } from "three";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

import { ParametricGeometries } from 'three-stdlib/geometries/ParametricGeometries';
import { NgtPhysicConstraint } from "@angular-three/cannon/constraints";

class ClothParticle {
  constructor(public mass: number, public position: NgtTriple, public velocity: NgtTriple) { }
}

@Component({
  selector: 'cloth-example',
  template: `<ngt-group (beforeRender)="tick($event.state)">
          <ngt-mesh>
            <ngt-plane-geometry [args]="[1, 1]"></ngt-plane-geometry>
            <!--<ngt-parametric-geometry  [args]="[Nx, Ny]"></ngt-parametric-geometry>-->
            <ngt-mesh-standard-material [parameters]="parameters"></ngt-mesh-standard-material>
          </ngt-mesh>

          <ngt-mesh [ref]="sphereProps.ref" [scale]="[sphereSize, sphereSize, sphereSize]">
            <ngt-sphere-geometry></ngt-sphere-geometry>
            <ngt-mesh-standard-material [parameters]="{ color: 'white' | color }"></ngt-mesh-standard-material>
          </ngt-mesh>
        </ngt-group>`,
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class ClothExample {

  cameraposition = new Vector3(Math.cos(Math.PI / 4) * 3, 0, Math.sin(Math.PI / 4) * 3);
  sphereSize = 0.1
  texture!: Texture;

  private clothMass = 1 // 1 kg in total
  private clothSize = 1 // 1 meter
  private Nx = 12 // number of horizontal particles in the cloth
  private Ny = 12 // number of vertical particles in the cloth
  private mass = (this.clothMass / this.Nx) * this.Ny
  private restDistance = this.clothSize / this.Nx

  clothGeometry!: ParametricGeometry;

  private particles: Array<Array<NgtPhysicBodyReturn>> = []


  get parameters(): MeshStandardMaterialParameters {
    const p: MeshStandardMaterialParameters = {
      side: DoubleSide
    }
    // to avoid THREE warning if map is undefined
    if (this.texture) {
      p.map = this.texture;
    }
    return p;
  }

  constructor(
    private loader: NgtLoader,
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) {
    const s = this.loader.use(TextureLoader, 'assets/sunflower.jpg').subscribe(next => {
      this.texture = next;
    },
      () => { },
      () => { s.unsubscribe(); }
    );


    // Create cannon particles
    for (let i = 0; i < this.Nx + 1; i++) {
      const particles: Array<NgtPhysicBodyReturn> = [];
      this.particles.push(particles)

      for (let j = 0; j < this.Ny + 1; j++) {
        //const index = j * (this.Nx + 1) + i
        const point = this.clothFunction(i / (this.Nx + 1), j / (this.Ny + 1), new Vector3())

        // Fix in place the first row
        const mass = j === this.Ny ? 0 : this.mass;
        const position = [point.x, point.y - this.Ny * 0.9 * this.restDistance, point.z] as NgtTriple;
        const velocity = [0, 0, -0.1 * (this.Ny - j)] as NgtTriple;

        const body = this.physicBody.useParticle(() => ({
          mass: mass,
          linearDamping: 0.5,
          position: position,
          velocity: velocity,
        }));
        particles.push(body);
      }

    }

    for (let i = 0; i < this.Nx + 1; i++) {
      for (let j = 0; j < this.Ny + 1; j++) {
        if (i < this.Nx) this.connect(i, j, i + 1, j)
        if (j < this.Ny) this.connect(i, j, i, j + 1)
      }
    }

    this.clothGeometry = new ParametricGeometry(this.clothFunction, this.Nx, this.Ny);
  }

  sphereProps = this.physicBody.useSphere(() => ({
    //type: 'Kinematic',
    mass: 0,
    material: {
      friction: 0,
      restitution: 0,
    },
    args: [this.sphereSize]
  }));


  //getParticleProps: GetByIndex<ParticleProps> = (index: number) => (
  //  {
  //    mass: this.particles[index].mass,
  //    linearDamping: 0.5,
  //  }
  //)

  clothFunction(u: number, v: number, target: Vector3): Vector3 {
    const x = (u - 0.5)
    const y = (v + 0.5)
    target.set(x, y, 0)
    return target;
  }

  // Connect the particles with distance constraints
  private connect(i1: number, j1: number, i2: number, j2: number) {
    this.physicConstraint.useDistanceConstraint(
      this.particles[i1][j1].ref, this.particles[i2][j2].ref, { distance: this.restDistance }
    );
  }


  tick({ clock }: NgtRenderState) {
    const movementRadius = 0.2;

    // Make the three.js cloth follow the cannon.js particles
    for (let i = 0; i < this.Nx + 1; i++) {
      for (let j = 0; j < this.Ny + 1; j++) {
        const index = j * (this.Nx + 1) + i
        //
        // ** can't access ParametricGeometry fields
        //
        //this.clothGeometry.vertices[index].copy(this.particles[i][j].api.position)
      }
    }

    this.clothGeometry.computeVertexNormals();

    // Move the ball in a circular motion
    this.sphereProps.api.position.set(movementRadius * Math.sin(clock.elapsedTime), movementRadius * Math.cos(clock.elapsedTime), 0)
  }
}


@Component({
  templateUrl: './cloth.component.html',
})
export class ClothComponent {
}


export class ParametricGeometry extends BufferGeometry {
  vertices: Array<number> = [];

  constructor(func = (u: number, v: number, target: Vector3) => target.set(u, v, Math.cos(u) * Math.sin(v)), slices = 8, stacks = 8) {

    super();

    this.type = 'ParametricGeometry';

    const parameters = {
      func: func,
      slices: slices,
      stacks: stacks
    };

    // buffers

    const indices = [];
    const normals = [];
    const uvs = [];

    const EPS = 0.00001;

    const normal = new Vector3();

    const p0 = new Vector3(), p1 = new Vector3();
    const pu = new Vector3(), pv = new Vector3();

    if (func.length < 3) {

      console.error('THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.');

    }

    // generate vertices, normals and uvs

    const sliceCount = slices + 1;

    for (let i = 0; i <= stacks; i++) {

      const v = i / stacks;

      for (let j = 0; j <= slices; j++) {

        const u = j / slices;

        // vertex

        func(u, v, p0);
        this.vertices.push(p0.x, p0.y, p0.z);

        // normal

        // approximate tangent vectors via finite differences

        if (u - EPS >= 0) {

          func(u - EPS, v, p1);
          pu.subVectors(p0, p1);

        } else {

          func(u + EPS, v, p1);
          pu.subVectors(p1, p0);

        }

        if (v - EPS >= 0) {

          func(u, v - EPS, p1);
          pv.subVectors(p0, p1);

        } else {

          func(u, v + EPS, p1);
          pv.subVectors(p1, p0);

        }

        // cross product of tangent vectors returns surface normal

        normal.crossVectors(pu, pv).normalize();
        normals.push(normal.x, normal.y, normal.z);

        // uv

        uvs.push(u, v);

      }

    }

    // generate indices

    for (let i = 0; i < stacks; i++) {

      for (let j = 0; j < slices; j++) {

        const a = i * sliceCount + j;
        const b = i * sliceCount + j + 1;
        const c = (i + 1) * sliceCount + j + 1;
        const d = (i + 1) * sliceCount + j;

        // faces one and two

        indices.push(a, b, d);
        indices.push(b, c, d);

      }

    }

    // build geometry

    this.setIndex(indices);
    this.setAttribute('position', new Float32BufferAttribute(this.vertices, 3));
    this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

  }

}
