import { Component } from "@angular/core";

import { AfterViewInit } from "@angular/core";

import { NgtPhysicBody, NgtPhysicConstraint } from "@angular-three/cannon";

@Component({
  selector: 'centerofmass-example',
  templateUrl: 'centerofmass-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class CenterOfMassExample implements AfterViewInit {

  cone = this.physicBody.useCylinder(() => ({
    mass: 1,
    args: [1, 0, 1, 20],
    position: [0, 5, 0],
    rotation: [0, 0, 0],
    angularDamping: 0.5,
    linearDamping: 0.5,
  }))

  particlesize = 0.1
  particle = this.physicBody.useSphere(() => ({
    mass: 2,
    args: [this.particlesize],
    position: [0, 3, 0],
    angularDamping: 0.5,
    linearDamping: 0.5,
    collisionResponse: false,
  }))

  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) { }

  ngAfterViewInit(): void {
    this.physicConstraint.useConeTwistConstraint(
      this.particle.ref, this.cone.ref, {
        pivotA: [0, 0, 0],
        pivotB: [0, -2, 0],
        
    });
    this.cone.api.rotation.set(1, 0, 0);
  }
}

@Component({
  templateUrl: './centerofmass.component.html',
})
export class CenterOfMassComponent {
  debug = true;
}
