import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { NgtRadianPipe, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";
import { NgtPhysicConstraint } from "@angular-three/cannon";
import { Vector3 } from "three";
import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";


@Component({
  selector: 'hinge-example',
  templateUrl: 'hinge-example.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class HingeExample implements AfterViewInit {
  @ViewChild('leftFrontWheel') leftFrontWheel!: PhysicsSphereDirective;
  @ViewChild('rightFrontWheel') rightFrontWheel!: PhysicsSphereDirective;
  @ViewChild('leftRearWheel') leftRearWheel!: PhysicsSphereDirective;
  @ViewChild('rightRearWheel') rightRearWheel!: PhysicsSphereDirective;

  // hinge
  size = 5;
  scale = [this.size * 0.1, this.size * 0.5, this.size * 0.5] as NgtTriple;

  staticProps = this.physicBody.useBox(() => ({
    mass: 0,
    args: this.scale,
    position: [0, this.size, 0],
  }));

  hingeProps = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.scale,
    angularDamping: 0.5,
    position: [0, this.size / 2 - 1, 0],
    rotation: [0, 0, new NgtRadianPipe().transform(20)],
  }));

  hinge = this.physicConstraint.useHingeConstraint(
    this.staticProps.ref, this.hingeProps.ref, {
    pivotA: [0, -1.5, 0],
    axisA: [0, 0, -1],
    pivotB: [0, 1.5, 0],
    axisB: [0, 0, -1],
  });


  // car
  chassisscale = [10, 0.9, 4] as NgtTriple;
  chassis = this.physicBody.useBox(() => ({
    mass: 1,
    args: this.chassisscale
  }));


  // Hinge the wheels
  leftAxis = new Vector3(0, 0, 1).toArray() as NgtTriple;
  rightAxis = new Vector3(0, 0, -1).toArray() as NgtTriple;
  leftFrontAxis = new Vector3(-0.3, 0, 0.7).normalize().toArray() as NgtTriple;
  rightFrontAxis = new Vector3(0.3, 0, -0.7).normalize().toArray() as NgtTriple;
  zero = [0, 0, 0] as NgtTriple;


  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) { }

  ngAfterViewInit(): void {
    const frontLeftHinge = this.physicConstraint.useHingeConstraint(
      this.chassis.ref, this.leftFrontWheel.body.ref, {
      pivotA: [-4, 0, 3.5],
      axisA: this.leftFrontAxis,
      pivotB: this.zero,
      axisB: this.leftAxis,
    });

    const frontRightHinge = this.physicConstraint.useHingeConstraint(
      this.chassis.ref, this.rightFrontWheel.body.ref, {
      pivotA: [-4, 0, -3.5],
      axisA: this.rightFrontAxis,
      pivotB: this.zero,
      axisB: this.rightAxis,
    });

    this.physicConstraint.useHingeConstraint(
      this.chassis.ref, this.leftRearWheel.body.ref, {
      pivotA: [4, 0, 3.5],
      axisA: this.leftAxis,
      pivotB: this.zero,
      axisB: this.leftAxis,
    });

    this.physicConstraint.useHingeConstraint(
      this.chassis.ref, this.rightRearWheel.body.ref, {
      pivotA: [4, 0, -3.5],
      axisA: this.rightAxis,
      pivotB: this.zero,
      axisB: this.rightAxis,
    });
    // Enable motors and set their velocities

    frontLeftHinge.api.enableMotor()
    frontRightHinge.api.enableMotor()

    const velocity = -14
    frontLeftHinge.api.setMotorSpeed(velocity)
    frontRightHinge.api.setMotorSpeed(-velocity)
  }
}

@Component({
  templateUrl: './hinge.component.html',
})
export class HingeComponent {
}
