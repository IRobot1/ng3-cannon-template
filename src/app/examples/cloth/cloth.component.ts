import { AfterViewInit, Component } from "@angular/core";

import { NgtLoader, NgtRenderState, NgtTriple } from "@angular-three/core";

import { Float32BufferAttribute, Mesh, Texture, TextureLoader } from "three";

import { NgtPhysicBody, NgtPhysicConstraint, NgtPhysicBodyReturn } from "@angular-three/cannon";


class ClothNode {
  constructor(public body: NgtPhysicBodyReturn, public position: NgtTriple) { }
}

@Component({
  selector: 'cloth-example',
  templateUrl: 'cloth-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class ClothExample implements AfterViewInit {

  sphereSize = 0.4
  texture!: Texture;

  private Nx = 12 // number of horizontal particles in the cloth
  private Ny = 12 // number of vertical particles in the cloth

  constructor(
    private loader: NgtLoader,
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) {
    this.loader.use(TextureLoader, 'assets/sunflower.jpg').subscribe(next => {
      this.texture = next;
    });

    this.initcloth();
  }

  clothnodes: Array<ClothNode> = [];
  nodesize = 0.15

  initcloth() {
    const distance = 0.4
    const mass = 0.5

    const bodies: any = {}; // bodies['i j'] => particle
    for (let i = 0; i < this.Nx; i++) {
      for (let j = 0; j < this.Ny; j++) {
        const position = [0, distance * j - 2, -distance * i + 2] as NgtTriple;

        // Create a new body
        const body = this.physicBody.useSphere(() => ({
          mass: j == this.Ny - 1 ? 0 : mass,
          args: [this.nodesize],
          position: position,
          angularDamping: 1,
        }));
        bodies[`${i} ${j}`] = body;
        const particle = new ClothNode(body, position);
        this.clothnodes.push(particle);
      }
    }

    for (let i = 0; i < this.Nx; i++) {
      for (let j = 0; j < this.Ny; j++) {
        if (i < this.Nx - 1) {
          this.physicConstraint.useDistanceConstraint(bodies[`${i} ${j}`].ref, bodies[`${i + 1} ${j}`].ref, { distance })
        }
        if (j < this.Ny - 1) {
          this.physicConstraint.useDistanceConstraint(bodies[`${i} ${j}`].ref, bodies[`${i} ${j + 1}`].ref, { distance })
        }
      }
    }

  }

  mesh!: Mesh;
  ready(mesh: Mesh) {
    this.mesh = mesh;
  }

  ngAfterViewInit(): void {
    // Create the faces
    const indices = [];
    for (let i = 0; i < this.Nx - 1; i++) {
      for (let j = 0; j < this.Ny - 1; j++) {
        const stride = this.Nx;
        const index = i * stride + j;
        indices.push(index + 1, index + stride, index + stride + 1);
        indices.push(index + stride, index + 1, index);
      }
    }
    const uvs = [];
    // simple plane UV
    for (let i = 0; i < this.Nx; i++) {
      const v = i / this.Nx;

      for (let j = 0; j < this.Ny; j++) {
        const u = j / this.Ny;
        uvs.push(u, v);
      }
    }
    this.mesh.geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

    this.mesh.geometry.setIndex(indices);
    this.recalcVertices();


    this.clothnodes.forEach(c => {
      c.body.api.position.subscribe(next => {
        c.position = next;
      })
    })
  }

  sphereProps = this.physicBody.useSphere(() => ({
    mass: 0,
    args: [this.sphereSize]
  }));



  recalcVertices() {
    const vertices: Array<number> = [];
    this.clothnodes.forEach(item => {
      const p = item.position;
      vertices.push(p[0], p[1], p[2]);
    });
    this.mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.mesh.geometry.computeVertexNormals();
  }


  tick({ clock }: NgtRenderState) {
    this.recalcVertices();

    const movementRadius = 1;
    // Move the ball in a circular motion
    this.sphereProps.api.position.set(0.1, movementRadius * Math.cos(clock.elapsedTime), movementRadius * Math.sin(clock.elapsedTime))
  }
}


@Component({
  templateUrl: './cloth.component.html',
})
export class ClothComponent {
}

