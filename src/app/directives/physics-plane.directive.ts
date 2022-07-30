import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";
import { BooleanInput, coerceBooleanProperty, NgtTriple } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";
import { AfterViewInit, Directive, Input } from "@angular/core";
import { MaterialOptions } from "@pmndrs/cannon-worker-api";

@Directive({
  selector: '[physicsplane]',
  providers: [NgtPhysicBody],
})
export class PhysicsPlaneDirective implements AfterViewInit {
  private _enabled: BooleanInput = true;
  @Input()
  get physicsplane(): boolean { return coerceBooleanProperty(this._enabled) }
  set physicsplane(newvalue: BooleanInput) {
    if (newvalue == this._enabled) return;

    this._enabled = newvalue;
    if (this.bodyreturn && !newvalue) {
      this.bodyreturn.api.remove();
    }
    else if (newvalue) {
      this.add();
    }
  }

  //allowSleep: boolean;
  //angularDamping: number;
  //collisionFilterGroup: number;
  //collisionFilterMask: number;
  //collisionResponse: boolean;
  //fixedRotation: boolean;
  //isTrigger: boolean;
  //linearDamping: number;
  @Input() bodymass = 0;
  @Input() bodymaterial: MaterialOptions = {};
  //sleepSpeedLimit: number;
  //sleepTimeLimit: number;
  //userData: Record<PropertyKey, any>;

  @Input() bodyposition!: NgtTriple;
  @Input() bodyrotation!: NgtTriple;
  //@Input() bodyscale: NgtTriple = [1, 1, 1];
  @Input() bodytype: 'Dynamic' | 'Static' | 'Kinematic' = 'Static';

  public bodyreturn!: NgtPhysicBodyReturn<any>;

  constructor(
    private physicBody: NgtPhysicBody,
    private mesh: NgtMesh,
  ) {

  }

  ngAfterViewInit(): void {
    if (this.physicsplane) {
      this.add();
    }
  }

  private add() {
    if (!this.bodyposition) {
      this.bodyposition = this.mesh.instance.value.position.toArray();
    }
    if (!this.bodyrotation) {
      this.bodyrotation = this.mesh.instance.value.position.toArray();
    }

    //const params = (this.mesh.instance.value.geometry as PlaneGeometry).parameters;
    this.bodyreturn = this.physicBody.usePlane(() => ({
      type: this.bodytype,
      mass: this.bodymass,
      material: this.bodymaterial,
      position: this.bodyrotation,
      rotation: this.bodyrotation,
      //args: Object.entries(params).map(([k, v]) => (v))
    }), false, this.mesh.instance);

  }
}
