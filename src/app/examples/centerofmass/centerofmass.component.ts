import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'centerofmass-example',
  templateUrl: 'centerofmass-example.component.html',
  providers: [NgtPhysicBody],
})
export class CenterOfMassExample {

  cylinder = this.physicBody.useCylinder(() => ({
    mass: 1,
    args: [0, 1, 1, 20],
    position: [0, 2, 0],
    rotation: [3.14, 0, 0],
  }))

  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './centerofmass.component.html',
})
export class CenterOfMassComponent {
}
