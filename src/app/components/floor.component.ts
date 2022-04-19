import { Component, Input } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'floor',
  template: `
      <ngt-mesh [ref]="planeProps.ref" [name]="name" receiveShadow>
        <ngt-plane-geometry [args]="[100, 100]"></ngt-plane-geometry>
        <ngt-mesh-standard-material color='#777777'></ngt-mesh-standard-material>
      </ngt-mesh>`,
  providers: [NgtPhysicBody],
})

export class FloorComponent {
  @Input() name = 'floor';
  @Input() friction = 1;

  planeProps = this.physicBody.usePlane(() => ({
    mass: 0,
    material: { friction: this.friction, restitution: 1 },
    rotation: [-1.57, 0, 0]
  }));


  constructor(private physicBody: NgtPhysicBody) { }

}
