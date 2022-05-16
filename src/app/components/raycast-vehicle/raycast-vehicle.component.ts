import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';

import { NgtTriple, Ref } from '@angular-three/core';

import { NgtPhysicBody, NgtPhysicRaycastVehicle, WheelInfoOptions } from '@angular-three/cannon';

@Component({
  selector: 'vehicle-chassis[ref]',
  template: `
    <ngt-mesh [ref]="ref" [position]="position" [rotation]="rotation">
        <ngt-box-geometry [args]="[2, 1, 4]"></ngt-box-geometry>
        <ngt-mesh-standard-material color="yellow"></ngt-mesh-standard-material>
    </ngt-mesh>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chassis {
  @Input() ref!: Ref;
  @Input() position?: NgtTriple;
  @Input() rotation?: NgtTriple;
}

@Component({
  selector: 'vehicle-wheel[ref]',
  template: `
      <ngt-group [ref]="ref">
        <ngt-group [rotation]="[0, 0, (leftSide ? 90 : -90) | radian]">
          <ngt-mesh [position]="[0, offset+wheelwidth/2, 0]">
            <ngt-cylinder-geometry [args]="[radius, radius, wheelwidth, 16]"></ngt-cylinder-geometry>
            <ngt-mesh-standard-material color="white"></ngt-mesh-standard-material>
          </ngt-mesh>
        </ngt-group>
      </ngt-group>  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtPhysicBody],
})
export class Wheel implements OnInit {
  @Input() ref!: Ref;
  @Input() radius = 0;
  @Input() leftSide = false;
  @Input() offset = 0;
  @Input() wheelwidth = 0.5;

  constructor(private physicBody: NgtPhysicBody) { }

  ngOnInit() {
    this.physicBody.useCompoundBody(
      () => ({
        collisionFilterGroup: 0,
        mass: 1,
        material: 'wheel',
        shapes: [
          {
            args: [this.radius, this.radius, this.wheelwidth, 16],
            rotation: [0, 0, -Math.PI / 2],
            type: 'Cylinder',
          },
        ],
        type: 'Kinematic',
      }),
      true,
      this.ref
    );
  }
}

const keyControlMap = {
  ' ': 'brake',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'forward',
} as const;

type KeyCode = keyof typeof keyControlMap;

const keyCodes = Object.keys(keyControlMap) as KeyCode[];
const isKeyCode = (v: unknown): v is KeyCode => keyCodes.includes(v as KeyCode);

@Component({
  selector: 'raycast-vehicle',
  template: `
    <ngt-group [ref]="raycastVehicleRef.ref" (beforeRender)="tick()">
      <vehicle-chassis [ref]="chassisRef.ref"></vehicle-chassis>
      <vehicle-wheel
        *ngFor="let wheelRef of wheels; even as isEven"
        [ref]="wheelRef"
        [radius]="radius"
        [leftSide]="isEven"
        [offset]="width/2"
      ></vehicle-wheel>
    </ngt-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtPhysicBody, NgtPhysicRaycastVehicle],
})
export class RaycastVehicleComponent {
  @Input() position?: NgtTriple;
  @Input() rotation?: NgtTriple;
  @Input() angularVelocity?: NgtTriple;

  private readonly back = -1.15;
  private readonly force = 1500;
  private readonly front = 1.3;
  private readonly height = -0.04;
  private readonly maxBrake = 50;
  private readonly steer = 0.5;
  readonly width = 1.1;
  readonly radius = 0.7;

  private backward = false;
  private brake = false;
  private forward = false;
  private left = false;
  private right = false;

  readonly wheelInfo: WheelInfoOptions = {
    axleLocal: [-1, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 2,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius: this.radius,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  readonly wheelInfo1: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [-this.width / 2, this.height, this.front],
    isFrontWheel: true,
  };
  readonly wheelInfo2: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [this.width / 2, this.height, this.front],
    isFrontWheel: true,
  };
  readonly wheelInfo3: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [-this.width / 2, this.height, this.back],
    isFrontWheel: false,
  };
  readonly wheelInfo4: WheelInfoOptions = {
    ...this.wheelInfo,
    chassisConnectionPointLocal: [this.width / 2, this.height, this.back],
    isFrontWheel: false,
  };

  readonly wheels = [new Ref(), new Ref(), new Ref(), new Ref()];

  readonly chassisRef = this.physicBody.useBox<THREE.Mesh>(() => ({
    allowSleep: false,
    angularVelocity: this.angularVelocity,
    args: [2, 1, 4],
    mass: 150,
    position: this.position,
    rotation: this.rotation,
  }));

  readonly raycastVehicleRef = this.physicRaycastVehicle.useRaycastVehicle(() => ({
    chassisBody: this.chassisRef.ref as Ref,
    wheelInfos: [this.wheelInfo1, this.wheelInfo2, this.wheelInfo3, this.wheelInfo4],
    wheels: this.wheels,
  }));

  constructor(
    private physicBody: NgtPhysicBody,
    private physicRaycastVehicle: NgtPhysicRaycastVehicle,
  ) { }

  @HostListener('window:keyup', ['$event'])
  private onKeyUp(event: KeyboardEvent) {
    if (!isKeyCode(event.key)) return;
    this[keyControlMap[event.key]] = false;
  }

  @HostListener('window:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    if (!isKeyCode(event.key)) return;
    this[keyControlMap[event.key]] = true;
  }

  tick() {
    const {
      forward,
      backward,
      force,
      chassisRef,
      raycastVehicleRef,
      left,
      right,
      steer,
      brake,
      maxBrake,
      position,
      angularVelocity,
      rotation,
    } = this;

    if (raycastVehicleRef.ref.value && chassisRef.ref.value && this.wheels.every((wheel) => wheel.value)) {
      for (let e = 2; e < 4; e++) {
        raycastVehicleRef.api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2);
      }

      for (let s = 0; s < 2; s++) {
        raycastVehicleRef.api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s);
      }

      for (let b = 2; b < 4; b++) {
        raycastVehicleRef.api.setBrake(brake ? maxBrake : 0, b);
      }

      if (position && rotation && angularVelocity) {
        chassisRef.api.position.set(...position);
        chassisRef.api.velocity.set(0, 0, 0);
        chassisRef.api.angularVelocity.set(...angularVelocity);
        chassisRef.api.rotation.set(...rotation);
      }
    }
  }
}
