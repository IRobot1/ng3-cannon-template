import { Component, Input } from "@angular/core";

import { Euler, Quaternion, Vector3 } from "three";
import { NgtEuler, NgtTriple } from "@angular-three/core";

import { CylinderArgs, NgtPhysicRaycastVehicle  } from "@angular-three/cannon";
import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'raycast-vehicle-model',
  templateUrl: 'raycast-vehicle-model.component.html',
  providers: [NgtPhysicBody, NgtPhysicRaycastVehicle],
})
export class RaycastVehicleModelComponent {
  @Input() name = 'raycast-vehicle';

  private _position = [0, 0, 0] as NgtTriple;
  @Input()
  get position(): NgtTriple {
    return this._position;
  }
  set position(newvalue: NgtTriple) {
    this._position = newvalue;
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));
  }

  @Input() rotation = [0, 0, 0] as NgtEuler;
  @Input() scale = 1;
  @Input() mass = 1;

  @Input() bodycolor = 'yellow';
  @Input() wheelcolor = 'gray';

  private _drive = false
  @Input()
  get drive(): boolean {
    return this._drive;
  }
  set drive(newvalue: boolean) {
    if (newvalue != this._drive) {
      this._drive = newvalue;
      if (newvalue) {
        this.enable_input();
      }
      else {
        this.disable_input();
      }
    }
  }

  wheelRadius = 0.5

  bodyArgs = [4, 1, 2] as NgtTriple;
  wheelArgs = [this.wheelRadius, this.wheelRadius, this.wheelRadius / 2, 20] as CylinderArgs;

  bodyposition!: NgtTriple;

  chassis = this.physicBody.useBox(() => ({
    mass: this.mass,
    args: this.bodyArgs,
    angularVelocity: [0, 0.5, 0] as NgtTriple,
    position: this.bodyposition
  }));

  private wheelrotation = new Euler(-Math.PI / 2, 0, 0);

  leftFrontWheel = this.physicBody.useCylinder(() => ({
    type: 'Kinematic',
    mass: 0,
    args: this.wheelArgs,
    collisionFilterGroup: 0, //turn off collisions
    rotation: [this.wheelrotation.x, this.wheelrotation.y, this.wheelrotation.z],
    position: this.leftfrontposition,
  
  }));

  rightFrontWheel = this.physicBody.useCylinder(() => ({
    type: 'Kinematic',
    mass: 0,
    args: this.wheelArgs,
    collisionFilterGroup: 0, //turn off collisions
    rotation: [this.wheelrotation.x, this.wheelrotation.y, this.wheelrotation.z],
    position: this.rightfrontposition,
  }));

  leftRearWheel = this.physicBody.useCylinder(() => ({
    type: 'Kinematic',
    mass: 0,
    args: this.wheelArgs,
    collisionFilterGroup: 0, //turn off collisions
    rotation: [this.wheelrotation.x, this.wheelrotation.y, this.wheelrotation.z],
    position: this.leftbackposition,
  
  }));

  rightRearWheel = this.physicBody.useCylinder(() => ({
    type: 'Kinematic',
    mass: 0,
    args: this.wheelArgs,
    collisionFilterGroup: 0, //turn off collisions
    rotation: [this.wheelrotation.x, this.wheelrotation.y, this.wheelrotation.z],
    position: this.rightbackposition,
  }));

  vehicle = this.raycastVehicle.useRaycastVehicle(() => ({
    chassisBody: this.chassis.ref,
    wheelInfos: [
      {
        radius: this.wheelRadius,
        directionLocal: [0, -1, 0] as NgtTriple,
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 1.4,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: [0, 0, 1] as NgtTriple,
        chassisConnectionPointLocal: [-1, 0, 1] as NgtTriple,
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
      },
      {
        radius: this.wheelRadius,
        directionLocal: [0, -1, 0] as NgtTriple,
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 1.4,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: [0, 0, 1] as NgtTriple,
        chassisConnectionPointLocal: [-1, 0, -1] as NgtTriple,
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
      },
      {
        radius: this.wheelRadius,
        directionLocal: [0, -1, 0] as NgtTriple,
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 1.4,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: [0, 0, 1] as NgtTriple,
        chassisConnectionPointLocal: [1, 0, 1] as NgtTriple,
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
      }, {
        radius: this.wheelRadius,
        directionLocal: [0, -1, 0] as NgtTriple,
        suspensionStiffness: 30,
        suspensionRestLength: 0.3,
        frictionSlip: 1.4,
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        rollInfluence: 0.01,
        axleLocal: [0, 0, 1] as NgtTriple,
        chassisConnectionPointLocal: [1, 0, -1] as NgtTriple,
        maxSuspensionTravel: 0.3,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
      }],
    wheels: [
      this.leftFrontWheel.ref,
      this.rightFrontWheel.ref,
      this.leftRearWheel.ref,
      this.rightRearWheel.ref,
    ]
  }));

  leftfrontposition!: NgtTriple;
  rightfrontposition!: NgtTriple;
  leftbackposition!: NgtTriple;
  rightbackposition!: NgtTriple;

  updatePositions(position: Vector3) {
    this.bodyposition = new Vector3(0, 0.25, 0).add(position).toArray() as NgtTriple;
    this.leftfrontposition = new Vector3(-1, 0, 1).add(position).toArray() as NgtTriple;
    this.rightfrontposition = new Vector3(-1, 0, -1).add(position).toArray() as NgtTriple;
    this.leftbackposition = new Vector3(1, 0, 1).add(position).toArray() as NgtTriple;
    this.rightbackposition = new Vector3(1, 0, -1).add(position).toArray() as NgtTriple;
  }


  constructor(
    private physicBody: NgtPhysicBody,
    private raycastVehicle: NgtPhysicRaycastVehicle,
  ) {
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));
  }

  private disable_input!: () => void;
  enable_input(): void {
    // movement
    const keydown = (event: KeyboardEvent) => {
      const maxSteerVal = 0.5
      const maxForce = 1000
      const brakeForce = 1000000

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          this.vehicle.api.applyEngineForce(-maxForce, 2)
          this.vehicle.api.applyEngineForce(-maxForce, 3)
          break

        case 's':
        case 'ArrowDown':
          this.vehicle.api.applyEngineForce(maxForce, 2)
          this.vehicle.api.applyEngineForce(maxForce, 3)
          break

        case 'a':
        case 'ArrowLeft':
          this.vehicle.api.setSteeringValue(maxSteerVal, 0)
          this.vehicle.api.setSteeringValue(maxSteerVal, 1)
          break

        case 'd':
        case 'ArrowRight':
          this.vehicle.api.setSteeringValue(-maxSteerVal, 0)
          this.vehicle.api.setSteeringValue(-maxSteerVal, 1)
          break

        case 'b':
          this.vehicle.api.setBrake(brakeForce, 0)
          this.vehicle.api.setBrake(brakeForce, 1)
          this.vehicle.api.setBrake(brakeForce, 2)
          this.vehicle.api.setBrake(brakeForce, 3)
          break
      }
    }
    document.addEventListener('keydown', keydown);

    const keyup = (event: KeyboardEvent) => {
      // Reset force on keyup
      document.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'w':
          case 'ArrowUp':
            this.vehicle.api.applyEngineForce(0, 2)
            this.vehicle.api.applyEngineForce(0, 3)
            break

          case 's':
          case 'ArrowDown':
            this.vehicle.api.applyEngineForce(0, 2)
            this.vehicle.api.applyEngineForce(0, 3)
            break

          case 'a':
          case 'ArrowLeft':
            this.vehicle.api.setSteeringValue(0, 0)
            this.vehicle.api.setSteeringValue(0, 1)
            break

          case 'd':
          case 'ArrowRight':
            this.vehicle.api.setSteeringValue(0, 0)
            this.vehicle.api.setSteeringValue(0, 1)
            break

          case 'b':
            this.vehicle.api.setBrake(0, 0)
            this.vehicle.api.setBrake(0, 1)
            this.vehicle.api.setBrake(0, 2)
            this.vehicle.api.setBrake(0, 3)
            break
        }
      })
    }
    document.addEventListener('keyup', keyup);

    this.disable_input = () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('keyup', keyup);
    }
  }
}
