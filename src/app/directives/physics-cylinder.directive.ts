import { AfterViewInit, Directive, EventEmitter, Input, Output } from "@angular/core";

import { CylinderGeometry } from "three";

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NgtTriple, NumberInput } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { MaterialOptions, Quad } from "@pmndrs/cannon-worker-api";

@Directive({
  selector: '[physicsCylinder]',
  exportAs: 'physicsCylinder',
  providers: [NgtPhysicBody],
})
export class PhysicsCylinderDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsCylinder(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsCylinder(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.body && !newvalue) {
      this.body.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  @Input() cylinderAllowSleep: BooleanInput = false
  @Input() cylinderAngularFactor: NgtTriple = [1, 1, 1];
  @Input() cylinderAngularVelocity: NgtTriple = [0, 0, 0];
  @Input() cylinderAngularDamping: NumberInput;
  @Input() collisionFilterGroup: NumberInput = 1;
  @Input() collisionFilterMask: NumberInput = -1;
  @Input() collisionResponse: BooleanInput = true;
  @Input() cylinderFixedRotation: BooleanInput = false;
  @Input() isTrigger: BooleanInput = false;
  @Input() cylinderLinearDamping: NumberInput;
  @Input() cylinderLinearFactor: NgtTriple = [1, 1, 1];
  @Input() cylinderMass: NumberInput = 0;
  @Input() cylinderMaterial: MaterialOptions = {};
  @Input() cylinderSleepSpeedLimit: NumberInput;
  @Input() cylinderSleepTimeLimit: NumberInput;
  @Input() cylinderUserData!: Record<PropertyKey, any>;

  @Input() cylinderPosition!: NgtTriple;
  @Input() cylinderRotation!: NgtTriple;
  @Input() cylinderVelocity!: NgtTriple;
  @Input() cylinderQuaternion!: Quad;

  @Input() cylinderBodyType: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  @Output() cylinderReady = new EventEmitter<NgtPhysicBodyReturn<any>>();
  @Output() cylinderCollide = new EventEmitter<any>();
  @Output() cylinderCollideBegin = new EventEmitter<any>();
  @Output() cylinderCollideEnd = new EventEmitter<any>();

  public body!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private mesh: NgtMesh,
  ) { }

  ngAfterViewInit(): void {
    if (this.physicsCylinder) {
      this.add();
    }
  }

  private add() {
    if (!this.cylinderPosition) {
      this.cylinderPosition = this.mesh.instance.value.position.toArray();
    }
    if (!this.cylinderRotation) {
      this.cylinderRotation = this.mesh.instance.value.rotation.toArray() as NgtTriple;
    }

    const mass = coerceNumberProperty(this.cylinderMass)
    if (mass > 0) {
      this.cylinderBodyType = 'Dynamic';
    }

    const params = (this.mesh.instance.value.geometry as CylinderGeometry).parameters;

    this.body = this.physicBody.useCylinder(() => ({
      type: this.cylinderBodyType,
      args: [params.radiusTop, params.radiusBottom, params.height, params.radialSegments],
      mass: mass,
      material: this.cylinderMaterial,
      position: this.cylinderPosition,
      rotation: this.cylinderRotation,
      quaternion: this.cylinderQuaternion,

      angularDamping: coerceNumberProperty(this.cylinderAngularDamping),
      angularFactor: this.cylinderAngularFactor,
      angularVelocity: this.cylinderAngularVelocity,
      collisionFilterGroup: coerceNumberProperty(this.collisionFilterGroup),
      collisionFilterMask: coerceNumberProperty(this.collisionFilterMask),
      collisionResponse: coerceBooleanProperty(this.collisionResponse),
      fixedRotation: coerceBooleanProperty(this.cylinderFixedRotation),
      isTrigger: coerceBooleanProperty(this.isTrigger),
      linearFactor: this.cylinderLinearFactor,
      linearDamping: coerceNumberProperty(this.cylinderLinearDamping),
      allowSleep: coerceBooleanProperty(this.cylinderAllowSleep),
      sleepTimeLimit: coerceNumberProperty(this.cylinderSleepTimeLimit),
      sleepSpeedLimit: coerceNumberProperty(this.cylinderSleepSpeedLimit),
      velocity: this.cylinderVelocity,
      userData: this.cylinderUserData,

      onCollide: (e) => { this.cylinderCollide.next(e) },
      onCollideBegin: (e) => { this.cylinderCollideBegin.next(e) },
      onCollideEnd: (e) => { this.cylinderCollideEnd.next(e) },
    }), false, this.mesh.instance);

    this.cylinderReady.next(this.body);

    //this.body.api.rotation.subscribe(next => { console.warn(next) })
  }
}
