import { Component, AfterContentInit } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { CompoundShape } from "../../directives/physics-compound.directive";

class CompoundPart {
  constructor(public position: NgtTriple, public color: string) { }
}

@Component({
  selector: 'compound-example',
  templateUrl: 'compound-example.component.html',
})
export class CompoundExample implements AfterContentInit {

  cubesize = 1.5;
  spheresize = 1.5;

  cubes: Array<CompoundPart> = [];
  spheres: Array<CompoundPart> = [];

  cubeshapes!: Array<CompoundShape>
  sphereshapes!: Array<CompoundShape>

  constructor() {
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
      } as CompoundShape;
    })

    this.sphereshapes = this.spheres.map(item => {
      return {
        type: 'Sphere',
        position: item.position,
        args: [this.spheresize]
      } as CompoundShape;
    })
  }


}

@Component({
  templateUrl: './compound.component.html',
})
export class CompoundComponent {
}
