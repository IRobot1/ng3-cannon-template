import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { BodyProps, CompoundBodyProps, GetByIndex, ShapeType } from "@angular-three/cannon";

class CompoundPart {
  constructor(public position: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './compound.component.html'
})
export class CompoundComponent {

  cubesize = 1.5;
  spheresize = 1.5;

  cubes: Array<CompoundPart> = [];
  spheres: Array<CompoundPart> = [];

  private cubeshapes: Array<BodyProps & { type: ShapeType; }>
  private sphereshapes: Array<BodyProps & { type: ShapeType; }>

  constructor() {
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

  getBoxCompoundProps: GetByIndex<CompoundBodyProps> = (index: number) => (
    {
      mass: 1,
      shapes: this.cubeshapes,
    }
  );

  getSphereCompoundProps: GetByIndex<CompoundBodyProps> = (index: number) => (
    {
      mass: 1,
      shapes: this.sphereshapes,
    }
  );
}
