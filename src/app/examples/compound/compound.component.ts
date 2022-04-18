import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";
import { BodyProps, ShapeType } from "@angular-three/cannon";

class CompoundPart {
  constructor(public position: NgtTriple, public color: string) { }
}

@Component({
  selector: 'compound-example',
  template: `
        <ngt-group [ref]="boxCompoundProps.ref">
          <ngt-mesh *ngFor="let cube of cubes" [position]="cube.position" [scale]="cubesize" [castShadow]="true">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-standard-material [parameters]="{ color: cube.color | color }"></ngt-mesh-standard-material>
          </ngt-mesh>
        </ngt-group>

        <ngt-group [ref]="sphereCompoundProps.ref">
          <ngt-mesh *ngFor="let cube of spheres" [position]="cube.position" [scale]="spheresize" [castShadow]="true">
            <ngt-sphere-geometry></ngt-sphere-geometry>
            <ngt-mesh-standard-material [parameters]="{ color: cube.color | color }"></ngt-mesh-standard-material>
          </ngt-mesh>
        </ngt-group>`,
  providers: [NgtPhysicBody],
})
export class CompoundExample {

  cubesize = 1.5;
  spheresize = 1.5;

  cubes: Array<CompoundPart> = [];
  spheres: Array<CompoundPart> = [];

  private cubeshapes: Array<BodyProps & { type: ShapeType; }>
  private sphereshapes: Array<BodyProps & { type: ShapeType; }>

  constructor(private physicBody: NgtPhysicBody) {
    this.cubes.push(new CompoundPart([0, -this.cubesize, -this.cubesize], 'blue'));
    this.cubes.push(new CompoundPart([0, this.cubesize, -this.cubesize], 'blue'));
    this.cubes.push(new CompoundPart([0, -this.cubesize, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, this.cubesize, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, 0, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, -this.cubesize, 0], 'white'));
    this.cubes.push(new CompoundPart([0, this.cubesize, 0], 'white'));

    this.cubeshapes = this.cubes.map(item => {
      return {
        type: 'Box',
        position: item.position,
        args: [this.cubesize, this.cubesize, this.cubesize]
      } as BodyProps & { type: ShapeType; };
    })

    this.spheres.push(new CompoundPart([0, -this.spheresize, -this.spheresize], 'blue'));
    this.spheres.push(new CompoundPart([0, -this.spheresize, this.spheresize], 'red'));
    this.spheres.push(new CompoundPart([0, this.spheresize, -this.spheresize], 'red'));
    this.spheres.push(new CompoundPart([0, this.spheresize, this.spheresize], 'blue'));

    this.sphereshapes = this.spheres.map(item => {
      return {
        type: 'Sphere',
        position: item.position,
        args: [this.spheresize]
      } as BodyProps & { type: ShapeType; };
    })

  }

  planeProps = this.physicBody.usePlane(() => ({
    mass: 0,
  }));

  boxCompoundProps = this.physicBody.useCompoundBody(() => ({
    mass: 1,
    shapes: this.cubeshapes,
    position: [0, 5, -1]
  }));

  sphereCompoundProps = this.physicBody.useCompoundBody(() => ({
    mass: 1,
    shapes: this.sphereshapes,
    position: [0, 10, 1]
  }));

}

@Component({
  templateUrl: './compound.component.html',
})
export class CompoundComponent {
}
