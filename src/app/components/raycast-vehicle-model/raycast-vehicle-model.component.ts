import { Component, Input } from "@angular/core";

import { Euler, Quaternion, Vector3 } from "three";
import { NgtEuler, NgtTriplet } from "@angular-three/core";

import { BoxProps, CylinderArgs, CylinderProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { WheelInfoOptions } from "@angular-three/cannon/lib/models/wheel-info-opts";

class RaycastVehicle {
  wheelInfos: Array<WheelInfoOptions> = [];

  addWheel(options: WheelInfoOptions) {
    this.wheelInfos.push(options);
  }
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
}
