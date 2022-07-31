import { AfterViewInit, Directive, EventEmitter, Input, Output } from "@angular/core";

import { BoxGeometry } from "three";

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NgtTriple, NumberInput } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { MaterialOptions, Quad } from "@pmndrs/cannon-worker-api";

@Directive({
  selector: '[physicsBox]',
  exportAs: 'physicsBox',
  providers: [NgtPhysicBody],
})
export class PhysicsBoxDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsBox(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsBox(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.body && !newvalue) {
      this.body.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  @Input() boxAllowSleep: BooleanInput = false
  @Input() boxAngularFactor: NgtTriple = [1, 1, 1];
  @Input() boxAngularVelocity: NgtTriple = [0, 0, 0];
  @Input() boxAngularDamping: NumberInput;
  @Input() collisionFilterGroup: NumberInput = 1;
  @Input() collisionFilterMask: NumberInput = -1;
  @Input() collisionResponse: BooleanInput = true;
  @Input() boxFixedRotation: BooleanInput = false;
  @Input() isTrigger: BooleanInput = false;
  @Input() boxLinearDamping: NumberInput;
  @Input() boxLinearFactor: NgtTriple = [1, 1, 1];
  @Input() boxMass: NumberInput = 0;
  @Input() boxMaterial: MaterialOptions = {};
  @Input() boxSleepSpeedLimit: NumberInput;
  @Input() boxSleepTimeLimit: NumberInput;
  @Input() boxUserData!: Record<PropertyKey, any>;

  @Input() boxPosition!: NgtTriple;
  @Input() boxRotation!: NgtTriple;
  @Input() boxVelocity!: NgtTriple;
  @Input() boxQuaternion!: Quad;

  @Input() boxBodyType: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  @Output() boxReady = new EventEmitter<NgtPhysicBodyReturn<any>>();
  @Output() boxCollide = new EventEmitter<any>();
  @Output() boxCollideBegin = new EventEmitter<any>();
  @Output() boxCollideEnd = new EventEmitter<any>();

  public body!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private mesh: NgtMesh,
  ) { }

  ngAfterViewInit(): void {
    if (this.physicsBox) {
      this.add();
    }
  }

  private add() {
    if (!this.boxPosition) {
      this.boxPosition = this.mesh.instance.value.position.toArray();
    }
    if (!this.boxRotation) {
      this.boxRotation = this.mesh.instance.value.rotation.toArray() as NgtTriple;
    }

    const mass = coerceNumberProperty(this.boxMass)
    if (mass > 0) {
      this.boxBodyType = 'Dynamic';
    }

    const params = (this.mesh.instance.value.geometry as BoxGeometry).parameters;

    this.body = this.physicBody.useBox(() => ({
      type: this.boxBodyType,
      args: [params.width, params.height, params.depth],
      mass: mass,
      material: this.boxMaterial,
      position: this.boxPosition,
      rotation: this.boxRotation,
      quaternion: this.boxQuaternion,

      angularDamping: coerceNumberProperty(this.boxAngularDamping),
      angularFactor: this.boxAngularFactor,
      angularVelocity: this.boxAngularVelocity,
      collisionFilterGroup: coerceNumberProperty(this.collisionFilterGroup),
      collisionFilterMask: coerceNumberProperty(this.collisionFilterMask),
      collisionResponse: coerceBooleanProperty(this.collisionResponse),
      fixedRotation: coerceBooleanProperty(this.boxFixedRotation),
      isTrigger: coerceBooleanProperty(this.isTrigger),
      linearFactor: this.boxLinearFactor,
      linearDamping: coerceNumberProperty(this.boxLinearDamping),
      allowSleep: coerceBooleanProperty(this.boxAllowSleep),
      sleepTimeLimit: coerceNumberProperty(this.boxSleepTimeLimit),
      sleepSpeedLimit: coerceNumberProperty(this.boxSleepSpeedLimit),
      velocity: this.boxVelocity,
      userData: this.boxUserData,

      onCollide: (e) => { this.boxCollide.next(e) },
      onCollideBegin: (e) => { this.boxCollideBegin.next(e) },
      onCollideEnd: (e) => { this.boxCollideEnd.next(e) },
    }), false, this.mesh.instance);

    this.boxReady.next(this.body);

    //this.body.api.rotation.subscribe(next => { console.warn(next) })
  }
}
