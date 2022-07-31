import { AfterViewInit, Directive, EventEmitter, Input, Output } from "@angular/core";

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NgtTriple, NumberInput } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { BodyProps, MaterialOptions, Quad, ShapeType } from "@pmndrs/cannon-worker-api";
import { NgtGroup } from "@angular-three/core/group";

export type CompoundShape = BodyProps & { type: ShapeType; };

@Directive({
  selector: '[physicsCompound]',
  exportAs: 'physicsCompound',
  providers: [NgtPhysicBody],
})
export class PhysicsCompoundDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsCompound(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsCompound(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.body && !newvalue) {
      this.body.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  @Input() shapes!: Array<CompoundShape>

  @Input() compoundAllowSleep: BooleanInput = false
  @Input() compoundAngularFactor: NgtTriple = [1, 1, 1];
  @Input() compoundAngularVelocity: NgtTriple = [0, 0, 0];
  @Input() compoundAngularDamping: NumberInput;
  @Input() collisionFilterGroup: NumberInput = 1;
  @Input() collisionFilterMask: NumberInput = -1;
  @Input() collisionResponse: BooleanInput = true;
  @Input() fixedRotation: BooleanInput = false;
  @Input() isTrigger: BooleanInput = false;
  @Input() compoundLinearDamping: NumberInput;
  @Input() compoundLinearFactor: NgtTriple = [1, 1, 1];
  @Input() compoundMass: NumberInput = 0;
  @Input() compoundMaterial: MaterialOptions = {};
  @Input() compoundSleepSpeedLimit: NumberInput;
  @Input() compoundSleepTimeLimit: NumberInput;
  @Input() compoundUserData!: Record<PropertyKey, any>;

  @Input() compoundPosition!: NgtTriple;
  @Input() compoundRotation!: NgtTriple;
  @Input() compoundVelocity!: NgtTriple;
  @Input() compoundQuaternion!: Quad;

  @Input() bodytype: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  @Output() compoundReady = new EventEmitter<NgtPhysicBodyReturn<any>>();
  @Output() compoundCollide = new EventEmitter<any>();
  @Output() compoundCollideBegin = new EventEmitter<any>();
  @Output() compoundCollideEnd = new EventEmitter<any>();

  public body!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private group: NgtGroup,
  ) { }

  ngAfterViewInit(): void {
    if (this.physicsCompound) {
      this.add();
    }
  }

  private add() {
    if (!this.compoundPosition) {
      this.compoundPosition = this.group.instance.value.position.toArray();
    }

    const mass = coerceNumberProperty(this.compoundMass)
    if (mass > 0) {
      this.bodytype = 'Dynamic';
    }

    this.body = this.physicBody.useCompoundBody(() => ({
      type: this.bodytype,
      mass: mass,
      material: this.compoundMaterial,
      position: this.compoundPosition,
      rotation: this.compoundRotation,
      quaternion: this.compoundQuaternion,

      shapes: this.shapes,

      angularDamping: coerceNumberProperty(this.compoundAngularDamping),
      angularFactor: this.compoundAngularFactor,
      angularVelocity: this.compoundAngularVelocity,
      collisionFilterGroup: coerceNumberProperty(this.collisionFilterGroup),
      collisionFilterMask: coerceNumberProperty(this.collisionFilterMask),
      collisionResponse: coerceBooleanProperty(this.collisionResponse),
      fixedRotation: coerceBooleanProperty(this.fixedRotation),
      isTrigger: coerceBooleanProperty(this.isTrigger),
      linearFactor: this.compoundLinearFactor,
      linearDamping: coerceNumberProperty(this.compoundLinearDamping),
      allowSleep: coerceBooleanProperty(this.compoundAllowSleep),
      sleepTimeLimit: coerceNumberProperty(this.compoundSleepTimeLimit),
      sleepSpeedLimit: coerceNumberProperty(this.compoundSleepSpeedLimit),
      velocity: this.compoundVelocity,
      userData: this.compoundUserData,

      onCollide: (e) => { this.compoundCollide.next(e) },
      onCollideBegin: (e) => { this.compoundCollideBegin.next(e) },
      onCollideEnd: (e) => { this.compoundCollideEnd.next(e) },
    }), false, this.group.instance);

    this.compoundReady.next(this.body);

    //this.body.api.rotation.subscribe(next => { console.warn(next) })
  }
}
