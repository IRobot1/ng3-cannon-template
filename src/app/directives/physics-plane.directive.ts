import { AfterViewInit, Directive, EventEmitter, Input, Output } from "@angular/core";

import { PlaneGeometry } from "three";

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NgtTriple, NumberInput } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { MaterialOptions, Quad } from "@pmndrs/cannon-worker-api";

@Directive({
  selector: '[physicsPlane]',
  exportAs: 'physicsPlane',
  providers: [NgtPhysicBody],
})
export class PhysicsPlaneDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsPlane(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsPlane(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.body && !newvalue) {
      this.body.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  @Input() planeAllowSleep: BooleanInput = false
  @Input() planeAngularFactor: NgtTriple = [1, 1, 1];
  @Input() planeAngularVelocity: NgtTriple = [0, 0, 0];
  @Input() planeAngularDamping: NumberInput;
  @Input() collisionFilterGroup: NumberInput = 1;
  @Input() collisionFilterMask: NumberInput = -1;
  @Input() collisionResponse: BooleanInput = true;
  @Input() planeFixedRotation: BooleanInput = false;
  @Input() isTrigger: BooleanInput = false;
  @Input() planeLinearDamping: NumberInput;
  @Input() planeLinearFactor: NgtTriple = [1, 1, 1];
  @Input() planeMass: NumberInput = 0;
  @Input() planeMaterial: MaterialOptions = {};
  @Input() planeSleepSpeedLimit: NumberInput;
  @Input() planeSleepTimeLimit: NumberInput;
  @Input() planeUserData!: Record<PropertyKey, any>;

  @Input() planePosition!: NgtTriple;
  @Input() planeRotation!: NgtTriple;
  @Input() planeVelocity!: NgtTriple;
  @Input() planeQuaternion!: Quad;

  @Input() planeBodyType: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  @Output() planeReady = new EventEmitter<NgtPhysicBodyReturn<any>>();
  @Output() planeCollide = new EventEmitter<any>();
  @Output() planeCollideBegin = new EventEmitter<any>();
  @Output() planeCollideEnd = new EventEmitter<any>();

  public body!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private mesh: NgtMesh,
  ) { }

  ngAfterViewInit(): void {
    if (this.physicsPlane) {
      this.add();
    }
  }

  private add() {
    if (!this.planePosition) {
      this.planePosition = this.mesh.instance.value.position.toArray();
    }
    if (!this.planeRotation) {
      this.planeRotation = this.mesh.instance.value.position.toArray();
    }

    const mass = coerceNumberProperty(this.planeMass)
    if (mass > 0) {
      this.planeBodyType = 'Dynamic';
    }

    const params = (this.mesh.instance.value.geometry as PlaneGeometry).parameters;

    this.body = this.physicBody.usePlane(() => ({
      type: this.planeBodyType,
      args: [params.width, params.height],
      mass: mass,
      material: this.planeMaterial,
      position: this.planePosition,
      rotation: this.planeRotation,
      quaternion: this.planeQuaternion,

      angularDamping: coerceNumberProperty(this.planeAngularDamping),
      angularFactor: this.planeAngularFactor,
      angularVelocity: this.planeAngularVelocity,
      collisionFilterGroup: coerceNumberProperty(this.collisionFilterGroup),
      collisionFilterMask: coerceNumberProperty(this.collisionFilterMask),
      collisionResponse: coerceBooleanProperty(this.collisionResponse),
      fixedRotation: coerceBooleanProperty(this.planeFixedRotation),
      isTrigger: coerceBooleanProperty(this.isTrigger),
      linearFactor: this.planeLinearFactor,
      linearDamping: coerceNumberProperty(this.planeLinearDamping),
      allowSleep: coerceBooleanProperty(this.planeAllowSleep),
      sleepTimeLimit: coerceNumberProperty(this.planeSleepTimeLimit),
      sleepSpeedLimit: coerceNumberProperty(this.planeSleepSpeedLimit),
      velocity: this.planeVelocity,
      userData: this.planeUserData,

      onCollide: (e) => { this.planeCollide.next(e) },
      onCollideBegin: (e) => { this.planeCollideBegin.next(e) },
      onCollideEnd: (e) => { this.planeCollideEnd.next(e) },
    }), false, this.mesh.instance);

    this.planeReady.next(this.body);

    //this.body.api.rotation.subscribe(next => { console.warn(next) })
  }
}
