import { BoxProps, GetByIndex, SphereProps } from "@angular-three/cannon";
import { NgtEuler, NgtTriplet } from "@angular-three/core";
import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { Vector3 } from "three";

class RigidVehicle {
  setWheelForce(value: number, wheelIndex: number) { }
  setSteeringValue(value: number, wheelIndex: number) { }
}


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
  }

  private disable_input!: () => void;
  enable_input(): void {
    const vehicle = new RigidVehicle();

    // movement
    const keydown = (event: KeyboardEvent) => {
      const maxSteerVal = Math.PI / 8
      const maxSpeed = 10
      const maxForce = 100

      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          vehicle.setWheelForce(maxForce, 2)
          vehicle.setWheelForce(-maxForce, 3)
          break

        case 's':
        case 'ArrowDown':
          vehicle.setWheelForce(-maxForce / 2, 2)
          vehicle.setWheelForce(maxForce / 2, 3)
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
      }
    }
    document.addEventListener('keydown', keydown);

    const keyup = (event: KeyboardEvent) => {
      // Reset force on keyup
      document.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'w':
          case 'ArrowUp':
            vehicle.setWheelForce(0, 2)
            vehicle.setWheelForce(0, 3)
            break

          case 's':
          case 'ArrowDown':
            vehicle.setWheelForce(0, 2)
            vehicle.setWheelForce(0, 3)
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
