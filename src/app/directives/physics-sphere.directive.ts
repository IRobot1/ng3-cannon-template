import { AfterViewInit, Directive, EventEmitter, Input, Output } from "@angular/core";

import { SphereGeometry } from "three";

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NgtTriple, NumberInput } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { MaterialOptions, Quad } from "@pmndrs/cannon-worker-api";

@Directive({
  selector: '[physicsSphere]',
  exportAs: 'physicsSphere',
  providers: [NgtPhysicBody],
})
export class PhysicsSphereDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsSphere(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsSphere(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.body && !newvalue) {
      this.body.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  @Input() sphereAllowSleep: BooleanInput = false
  @Input() sphereAngularFactor: NgtTriple = [1, 1, 1];
  @Input() sphereAngularVelocity: NgtTriple = [0, 0, 0];
  @Input() sphereAngularDamping: NumberInput;
  @Input() collisionFilterGroup: NumberInput = 1;
  @Input() collisionFilterMask: NumberInput = -1;
  @Input() collisionResponse: BooleanInput = true;
  @Input() fixedRotation: BooleanInput = false;
  @Input() isTrigger: BooleanInput = false;
  @Input() sphereLinearDamping: NumberInput;
  @Input() sphereLinearFactor: NgtTriple = [1, 1, 1];
  @Input() sphereMass: NumberInput = 0;
  @Input() sphereMaterial: MaterialOptions = {};
  @Input() sphereSleepSpeedLimit: NumberInput;
  @Input() sphereSleepTimeLimit: NumberInput;
  @Input() sphereUserData!: Record<PropertyKey, any>;

  @Input() spherePosition!: NgtTriple;
  @Input() sphereRotation!: NgtTriple;
  @Input() sphereVelocity!: NgtTriple;
  @Input() sphereQuaternion!: Quad;

  @Input() bodytype: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  @Output() sphereReady = new EventEmitter<NgtPhysicBodyReturn<any>>();
  @Output() sphereCollide = new EventEmitter<any>();
  @Output() sphereCollideBegin = new EventEmitter<any>();
  @Output() sphereCollideEnd = new EventEmitter<any>();

  public body!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private mesh: NgtMesh,
  ) { }

  ngAfterViewInit(): void {
    if (this.physicsSphere) {
      this.add();
    }
  }

  private add() {
    if (!this.spherePosition) {
      this.spherePosition = this.mesh.instance.value.position.toArray();
    }

    const mass = coerceNumberProperty(this.sphereMass)
    if (mass > 0) {
      this.bodytype = 'Dynamic';
    }

    const params = (this.mesh.instance.value.geometry as SphereGeometry).parameters;

    this.body = this.physicBody.useSphere(() => ({
      type: this.bodytype,
      args: [params.radius],
      mass: mass,
      material: this.sphereMaterial,
      position: this.spherePosition,
      rotation: this.sphereRotation,
      quaternion: this.sphereQuaternion,

      angularDamping: coerceNumberProperty(this.sphereAngularDamping),
      angularFactor: this.sphereAngularFactor,
      angularVelocity: this.sphereAngularVelocity,
      collisionFilterGroup: coerceNumberProperty(this.collisionFilterGroup),
      collisionFilterMask: coerceNumberProperty(this.collisionFilterMask),
      collisionResponse: coerceBooleanProperty(this.collisionResponse),
      fixedRotation: coerceBooleanProperty(this.fixedRotation),
      isTrigger: coerceBooleanProperty(this.isTrigger),
      linearFactor: this.sphereLinearFactor,
      linearDamping: coerceNumberProperty(this.sphereLinearDamping),
      allowSleep: coerceBooleanProperty(this.sphereAllowSleep),
      sleepTimeLimit: coerceNumberProperty(this.sphereSleepTimeLimit),
      sleepSpeedLimit: coerceNumberProperty(this.sphereSleepSpeedLimit),
      velocity: this.sphereVelocity,
      userData: this.sphereUserData,

      onCollide: (e) => { this.sphereCollide.next(e) },
      onCollideBegin: (e) => { this.sphereCollideBegin.next(e) },
      onCollideEnd: (e) => { this.sphereCollideEnd.next(e) },
    }), false, this.mesh.instance);

    this.sphereReady.next(this.body);

    //this.body.api.rotation.subscribe(next => { console.warn(next) })
  }
}
