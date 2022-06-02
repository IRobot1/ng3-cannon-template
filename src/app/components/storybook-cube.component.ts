import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";

import { NgtEuler, NgtTriple } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'storybook-cube',
  template: `
        <ngt-mesh [name]="name"
            [ref]="physics.ref" 
            [receiveShadow]="true"
            [castShadow]="true"
            [position]="position"
            [rotation]="rotation"
            [scale]="scale">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-lambert-material [parameters]="{ color: color }"></ngt-mesh-lambert-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class CubeComponent implements AfterViewInit {
  private _position = [0, 0, 0] as NgtTriple;
  @Input()
  get position(): NgtTriple {
    return this._position;
  }
  set position(newvalue: NgtTriple) {
    this.physics.api.position.set(newvalue[0], newvalue[1], newvalue[2]);
    this._position = newvalue;
  }
  @Input() scale = [0.5, 0.5, 0.5] as NgtTriple;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtEuler;
  @Input() name = 'cube';
  @Input() mass = 1;
  @Input() color = 'hotpink';
  @Input() type = 'Dynamic';

  @Input() set enabled(newvalue: boolean) {
    if (newvalue)
      this.physics.api.wakeUp();
    else
      this.physics.api.sleep();
  }

  @ViewChild(NgtMesh) mesh!: NgtMesh;

  physics = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: this.position,
    rotation: this.rotation as NgtTriple,
    args: this.scale,
    material: { friction: 0.1 },
  }));

  constructor(private physicBody: NgtPhysicBody) { }

  ngAfterViewInit(): void {
    this.mesh.instance.value.userData['physics'] = this.physics; // used by conveyor
  }
}
