import { BoxProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { NgtEuler, NgtTriplet } from "@angular-three/core";
import { Component, Input } from "@angular/core";
import { Vector3 } from "three";

@Component({
  selector: 'rigidbody-model',
  templateUrl: 'rigidbody-model.component.html'
})
export class RigidBodyModelComponent {
  @Input() name = 'rigidbody';

  private _position = [0, 1, 0] as NgtTriplet;
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

  axisWidth = 4
  wheelRadius = 0.75

  bodyArgs = [5, 0.5, 2.5] as NgtTriplet;
  centerOfMassAdjust = new Vector3(0, -1, 0)

  bodyposition!: Vector3
  leftfrontposition!: Vector3
  rightfrontposition!: Vector3
  leftbackposition!: Vector3
  rightbackposition!: Vector3

  down = new Vector3(0, -1, 0);

  leftfrontwheel = {
    position: this.leftfrontposition,
    axis: new Vector3(0, 0, 1),
    direction: this.down,
  }
  rightfrontwheel = {
    position: this.rightfrontposition,
    axis: new Vector3(0, 0, -1),
    direction: this.down,
  }
  leftbackwheel = {
    position: this.leftbackposition,
    axis: new Vector3(0, 0, 1),
    direction: this.down,
  }
  rightbackwheel = {
    position: this.rightbackposition,
    axis: new Vector3(0, 0, -1),
    direction: this.down,
  }

  updatePositions(position: Vector3) {
    this.bodyposition = new Vector3(0, this.wheelRadius, 0).add(position).add(this.centerOfMassAdjust);
    this.leftfrontposition = new Vector3(-2.5, this.wheelRadius, this.axisWidth / 2).add(position).add(this.centerOfMassAdjust);
    this.rightfrontposition = new Vector3(-2.5, this.wheelRadius, -this.axisWidth / 2).add(position).add(this.centerOfMassAdjust);
    this.leftbackposition = new Vector3(2.5, this.wheelRadius, this.axisWidth / 2).add(position).add(this.centerOfMassAdjust);
    this.rightbackposition = new Vector3(2.5, this.wheelRadius, -this.axisWidth / 2).add(position).add(this.centerOfMassAdjust);
  }

  getBodyProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: this.mass,
      args: this.bodyArgs,
      offset: [0, -1, 0] as NgtTriplet,  // center of mass
    }
  )

  getWheelProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: this.mass,
      args: [this.wheelRadius],
      angularDamping: 0.4, // Some damping to not spin wheels too fast
    }
  )



  constructor() {
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));

    //vehicle.wheelBodies.forEach((wheelBody) => {
    //  // Some damping to not spin wheels too fast
    //  wheelBody.angularDamping = 0.4

    //  // Add visuals
    //  demo.addVisual(wheelBody)
    //})

    //vehicle.addToWorld(world)
  }
}
