import { Component, EventEmitter, Input, Output } from "@angular/core";

import { NgtTriple, NgtVector3 } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'trigger-cube',
  template: `
        <ngt-mesh [name]="name"
            [ref]="cubeProps.ref"             
            [scale]="scale">
            <ngt-box-geometry></ngt-box-geometry>
            <ngt-mesh-standard-material
                [parameters]="{ wireframe: true, color: 'red' }"
            ></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class TriggerCubeComponent {
  @Input() position?: NgtVector3;
  @Input() name = 'triggercube';
  scale = [0.5, 5, 2] as NgtVector3;

  @Output() trigger = new EventEmitter<string>();

  cubeProps = this.physicBody.useBox(() => ({
    isTrigger: true,
    position: this.position as NgtTriple,
    scale: this.scale,
    onCollideBegin: (e) => {
      this.trigger.emit('volume triggered by ' + e.body.name);
    },
    args: this.scale as NgtTriple  // this is required for box geometry
  }));

  constructor(private physicBody: NgtPhysicBody) { }

}
