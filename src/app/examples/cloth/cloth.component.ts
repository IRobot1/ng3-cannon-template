import { Component, ViewChild } from "@angular/core";

import { NgtLoader, NgtRender, NgtTriplet } from "@angular-three/core";

import { DoubleSide, MeshStandardMaterialParameters, Texture, TextureLoader, Vector3 } from "three";

import { GetByIndex,  SphereProps } from "@angular-three/cannon";
import { NgtPhysicSphere } from "@angular-three/cannon/bodies";

import { ParametricGeometries } from 'three-stdlib/geometries/ParametricGeometries';

class ClothParticle {
  constructor(public mass: number, public position: NgtTriplet, public velocity: NgtTriplet) { }
}

@Component({
  templateUrl: './cloth.component.html'
})
export class ClothComponent {
  @ViewChild(NgtPhysicSphere) sphere!: NgtPhysicSphere;

  cameraposition = new Vector3(Math.cos(Math.PI / 4) * 3, 0, Math.sin(Math.PI / 4) * 3);
  sphereSize = 0.1
  texture!: Texture;

  private clothMass = 1 // 1 kg in total
  private clothSize = 1 // 1 meter
  private Nx = 12 // number of horizontal particles in the cloth
  private Ny = 12 // number of vertical particles in the cloth
  private mass = (this.clothMass / this.Nx) * this.Ny
  private restDistance = this.clothSize / this.Nx

  //
  // ERROR: THREE.ParametricGeometry has been moved to /examples/jsm/geometries/ParametricGeometry.js
  // ** ParametricGeometry missing from three-stdlib
  //
  clothGeometry = new ParametricGeometries.PlaneGeometry(this.Nx, this.Ny, this.Nx, this.Ny)

  private particles: Array<Array<ClothParticle>> = []


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

  constructor(private loader: NgtLoader) {
    const s = this.loader.use(TextureLoader, 'assets/sunflower.jpg').subscribe(next => {
      this.texture = next;
    },
      () => { },
      () => { s.unsubscribe(); }
    );


    // Create cannon particles
    for (let i = 0; i < this.Nx + 1; i++) {
      const particles: Array<ClothParticle> = [];
      this.particles.push(particles)

      for (let j = 0; j < this.Ny + 1; j++) {
        //const index = j * (this.Nx + 1) + i
        const point = this.clothFunction(i / (this.Nx + 1), j / (this.Ny + 1))

        // Fix in place the first row
        const mass = j === this.Ny ? 0 : this.mass;
        const position = [point.x, point.y - this.Ny * 0.9 * this.restDistance, point.z] as NgtTriplet;
        const velocity = [0, 0, -0.1 * (this.Ny - j)] as NgtTriplet;

        particles.push(new ClothParticle(mass, position, velocity));
      }

    }

    for (let i = 0; i < this.Nx + 1; i++) {
      for (let j = 0; j < this.Ny + 1; j++) {
        if (i < this.Nx) this.connect(i, j, i + 1, j)
        if (j < this.Ny) this.connect(i, j, i, j + 1)
      }
    }
  }

  getSphereProps: GetByIndex<SphereProps> = (index: number) => (
    {
      //type: 'Kinematic',
      mass: 0,
      material: {
        friction: 0,
        restitution: 0,
      },
      args: [this.sphereSize]
    }
  )

  //getParticleProps: GetByIndex<ParticleProps> = (index: number) => (
  //  {
  //    mass: this.particles[index].mass,
  //    linearDamping: 0.5,
  //  }
  //)

  clothFunction(u: number, v: number): Vector3 {
    const x = (u - 0.5) * this.restDistance * this.Nx
    const y = (v + 0.5) * this.restDistance * this.Ny
    return new Vector3(x, y, 0);
  }

  // Connect the particles with distance constraints
  private connect(i1: number, j1: number, i2: number, j2: number) {
    //
    // ** constraints not supported by @angular-three/cannon
    //
    //world.addConstraint(new CANNON.DistanceConstraint(particles[i1][j1], particles[i2][j2], restDistance))
  }


  tick({ clock }: NgtRender) {
    const movementRadius = 0.2;

    // Make the three.js cloth follow the cannon.js particles
    for (let i = 0; i < this.Nx + 1; i++) {
      for (let j = 0; j < this.Ny + 1; j++) {
        const index = j * (this.Nx + 1) + i
        //
        // ** can't access ParametricGeometry fields
        //
        //this.clothGeometry.vertices[index].copy(this.particles[i][j].position)
      }
    }

    //this.clothGeometry.normalsNeedUpdate = true
    //this.clothGeometry.verticesNeedUpdate = true

    // Move the ball in a circular motion
    this.sphere.api.position.set(movementRadius * Math.sin(clock.elapsedTime), movementRadius * Math.cos(clock.elapsedTime), 0)
  }
}



