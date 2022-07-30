import { Component, Input } from "@angular/core";

import { NgtTriple } from "@angular-three/core";


@Component({
  selector: 'floor',
  template: `
      <ngt-mesh
          physicsplane [bodyrotation]="[-1.57, 0, 0]" [bodymaterial]="{ friction: friction, restitution: 1 }"
          [name]="name" [position]="position" receiveShadow>
        <ngt-plane-geometry [args]="[100, 100]"></ngt-plane-geometry>
        <ngt-mesh-standard-material color='#777777'></ngt-mesh-standard-material>
      </ngt-mesh>`
})

export class FloorComponent {
  @Input() name = 'floor';
  @Input() position = [0, 10, 0] as NgtTriple;
  @Input() friction = 1;
}
