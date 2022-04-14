import { Component, Input } from "@angular/core";

import { Euler, Quaternion, Vector3 } from "three";
import { NgtEuler, NgtTriplet } from "@angular-three/core";

import { BoxProps, CylinderArgs, CylinderProps, GetByIndex } from "@angular-three/cannon";
import { WheelInfoOptions } from "@angular-three/cannon/lib/models/wheel-info-opts";

class RaycastVehicle {
  wheelInfos: Array<WheelInfoOptions> = [];

  addWheel(options: WheelInfoOptions) {
    this.wheelInfos.push(options);
  }

  applyEngineForce(value: number, wheelIndex: number) { }
  setSteeringValue(value: number, wheelIndex: number) { }
  setBrake(brake: number, wheelIndex: number) { }
}


@Component({
  selector: 'raycast-vehicle-model',
  templateUrl: 'raycast-vehicle-model.component.html'
})
export class RaycastVehicleModelComponent {
  @Input() name = 'raycast-vehicle';

  private _position = [0, 0, 0] as NgtTriplet;
  @Input()
  get position(): NgtTriplet {
    return this._position;
  }
  set position(newvalue: NgtTriplet) {
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

  bodyArgs = [4, 1, 2] as NgtTriplet;
  wheelArgs = [this.wheelRadius, this.wheelRadius, this.wheelRadius / 2, 20] as CylinderArgs;

  bodyposition!: Vector3

  wheelOptions = {
    radius: this.wheelRadius,
    directionLocal: [0, -1, 0] as NgtTriplet,
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    frictionSlip: 1.4,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    axleLocal: [0, 0, 1] as NgtTriplet,
    chassisConnectionPointLocal: [-1, 0, 1] as NgtTriplet,
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  } as WheelInfoOptions;


  getBodyProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: this.mass,
      args: this.bodyArgs,
      angularVelocity: [0, 0.5, 0] as NgtTriplet,
    }
  )

  private wheelrotation = new Euler(-Math.PI / 2, 0, 0);
  private orientation = new Quaternion().setFromEuler(this.wheelrotation);

  getWheelProps: GetByIndex<CylinderProps> = (index: number) => (
    {
      type: 'Kinematic',
      mass: 0,
      args: this.wheelArgs,
      collisionFilterGroup: 0, //turn off collisions
      offset: [0, 0, 0] as NgtTriplet,
      orientation: this.orientation,
      rotation: [this.wheelrotation.x, this.wheelrotation.y, this.wheelrotation.z]
    }
  )

  leftfrontposition!: Vector3
  rightfrontposition!: Vector3
  leftbackposition!: Vector3
  rightbackposition!: Vector3

  updatePositions(position: Vector3) {
    this.bodyposition = new Vector3(0, 0.25, 0).add(position);
    this.leftfrontposition = new Vector3(-1, 0, 1).add(position);
    this.rightfrontposition = new Vector3(-1, 0, -1).add(position)
    this.leftbackposition = new Vector3(1, 0, 1).add(position)
    this.rightbackposition = new Vector3(1, 0, -1).add(position)
  }


  constructor() {
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));

    const vehicle = new RaycastVehicle();

    // wheel locations
    this.wheelOptions.chassisConnectionPointLocal = [-1, 0, 1]
    vehicle.addWheel(this.wheelOptions);

    this.wheelOptions.chassisConnectionPointLocal = [-1, 0, -1]
    vehicle.addWheel(this.wheelOptions)

    this.wheelOptions.chassisConnectionPointLocal = [1, 0, 1]
    vehicle.addWheel(this.wheelOptions)

    this.wheelOptions.chassisConnectionPointLocal = [1, 0, -1]
    vehicle.addWheel(this.wheelOptions)

    // Add the wheel bodies

    //const wheelBodies = []
    //vehicle.wheelInfos.forEach((wheel) => {
    //  wheelBody.addShape(cylinderShape, new CANNON.Vec3(), quaternion)
    //  wheelBodies.push(wheelBody)
    //})
  }

  private disable_input!: () => void;
  enable_input(): void {
    const vehicle = new RaycastVehicle();

    // movement
    const keydown = (event: KeyboardEvent) => {
      const maxSteerVal = 0.5
      const maxForce = 1000
      const brakeForce = 1000000

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          vehicle.applyEngineForce(-maxForce, 2)
          vehicle.applyEngineForce(-maxForce, 3)
          break

        case 's':
        case 'ArrowDown':
          vehicle.applyEngineForce(maxForce, 2)
          vehicle.applyEngineForce(maxForce, 3)
          break

        case 'a':
        case 'ArrowLeft':
          vehicle.setSteeringValue(maxSteerVal, 0)
          vehicle.setSteeringValue(maxSteerVal, 1)
          break

        case 'd':
        case 'ArrowRight':
          vehicle.setSteeringValue(-maxSteerVal, 0)
          vehicle.setSteeringValue(-maxSteerVal, 1)
          break

        case 'b':
          vehicle.setBrake(brakeForce, 0)
          vehicle.setBrake(brakeForce, 1)
          vehicle.setBrake(brakeForce, 2)
          vehicle.setBrake(brakeForce, 3)
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
            vehicle.applyEngineForce(0, 2)
            vehicle.applyEngineForce(0, 3)
            break

          case 's':
          case 'ArrowDown':
            vehicle.applyEngineForce(0, 2)
            vehicle.applyEngineForce(0, 3)
            break

          case 'a':
          case 'ArrowLeft':
            vehicle.setSteeringValue(0, 0)
            vehicle.setSteeringValue(0, 1)
            break

          case 'd':
          case 'ArrowRight':
            vehicle.setSteeringValue(0, 0)
            vehicle.setSteeringValue(0, 1)
            break

          case 'b':
            vehicle.setBrake(0, 0)
            vehicle.setBrake(0, 1)
            vehicle.setBrake(0, 2)
            vehicle.setBrake(0, 3)
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
