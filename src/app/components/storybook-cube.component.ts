import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";

import { NgtTriple } from "@angular-three/core";
import { NgtMesh } from "@angular-three/core/meshes";

import { PhysicsBoxDirective } from "../directives/physics-box.directive";

@Component({
  selector: 'storybook-cube',
  template: `
        <ngt-mesh [name]="name"
            #cube="physicsBox"
            physicsBox [boxMass]="mass"
            [boxMaterial]="{ friction: 0.1 }"
            receiveShadow
            castShadow
            [position]="position"
            [boxRotation]="rotation">
            <ngt-box-geometry [args]="scale"></ngt-box-geometry>
            <ngt-mesh-lambert-material [color]="color"></ngt-mesh-lambert-material>
        </ngt-mesh>`,
})
export class CubeComponent implements AfterViewInit {
  @ViewChild(NgtMesh) mesh!: NgtMesh;
  @ViewChild('cube') physics!: PhysicsBoxDirective;

  private _position = [0, 0, 0] as NgtTriple;
  @Input()
  get position(): NgtTriple {
    return this._position;
  }
  set position(newvalue: NgtTriple) {
    this._position = newvalue;
    if (this.physics) {
      this.physics.body.api.position.set(newvalue[0], newvalue[1], newvalue[2]);
    }
  }
  @Input() scale = [0.5, 0.5, 0.5] as NgtTriple;
  @Input() rotation = [0.4, 0.2, 0.5] as NgtTriple;
  @Input() name = 'cube';
  @Input() mass = 1;
  @Input() color = 'hotpink';
  @Input() type = 'Dynamic';

  @Input() set enabled(newvalue: boolean) {
    if (newvalue)
      this.physics.body.api.wakeUp();
    else
      this.physics.body.api.sleep();
  }

  ngAfterViewInit(): void {
    this.mesh.instance.value.userData['physics'] = this.physics.body; // used by conveyor
  }
}
