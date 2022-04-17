import { Component, Input } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'floor',
  template: `
      <ngt-mesh [ref]="planeProps.ref" [name]="name"
                [receiveShadow]="true">
        <ngt-plane-geometry [args]="[100, 100]"></ngt-plane-geometry>
        <ngt-mesh-standard-material [parameters]="{ color: '#777777' | color }"></ngt-mesh-standard-material>
      </ngt-mesh>`,
  providers: [NgtPhysicBody],
})

export class FloorComponent {
  @Input() name = 'floor';

  planeProps = this.physicBody.usePlane(() => ({
    mass: 0,
    material: { restitution: 1 },
    rotation: [-1.57, 0, 0]
  }));


  constructor(private physicBody: NgtPhysicBody) { }

}
