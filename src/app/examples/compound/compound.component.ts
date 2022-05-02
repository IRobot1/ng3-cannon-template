import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";
import { BodyProps, ShapeType } from "@angular-three/cannon";
import { AfterContentInit } from "@angular/core";

class CompoundPart {
  constructor(public position: NgtTriple, public color: string) { }
}

@Component({
  selector: 'compound-example',
  templateUrl: 'compound-example.component.html',
  providers: [NgtPhysicBody],
})
export class CompoundExample implements AfterContentInit {

  cubesize = 1.5;
  spheresize = 1.5;

  cubes: Array<CompoundPart> = [];
  spheres: Array<CompoundPart> = [];

  private cubeshapes!: Array<BodyProps & { type: ShapeType; }>
  private sphereshapes!: Array<BodyProps & { type: ShapeType; }>

  constructor(private physicBody: NgtPhysicBody) {
    this.cubes.push(new CompoundPart([0, -this.cubesize, -this.cubesize], 'blue'));
    this.cubes.push(new CompoundPart([0, this.cubesize, -this.cubesize], 'blue'));
    this.cubes.push(new CompoundPart([0, -this.cubesize, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, this.cubesize, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, 0, this.cubesize], 'red'));
    this.cubes.push(new CompoundPart([0, -this.cubesize, 0], 'white'));
    this.cubes.push(new CompoundPart([0, this.cubesize, 0], 'white'));

    this.spheres.push(new CompoundPart([0, -this.spheresize, -this.spheresize], 'blue'));
    this.spheres.push(new CompoundPart([0, -this.spheresize, this.spheresize], 'red'));
    this.spheres.push(new CompoundPart([0, this.spheresize, -this.spheresize], 'red'));
    this.spheres.push(new CompoundPart([0, this.spheresize, this.spheresize], 'blue'));
  }

  ngAfterContentInit(): void {
    this.cubeshapes = this.cubes.map(item => {
      return {
        type: 'Box',
        position: item.position,
        args: [this.cubesize, this.cubesize, this.cubesize]
      } as BodyProps & { type: ShapeType; };
    })

    this.sphereshapes = this.spheres.map(item => {
      return {
        type: 'Sphere',
        position: item.position,
        args: [this.spheresize]
      } as BodyProps & { type: ShapeType; };
    })
  }

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
