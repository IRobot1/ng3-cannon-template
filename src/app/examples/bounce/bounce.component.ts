import { Component } from "@angular/core";

@Component({
  selector: 'bounce-example',
  template: `
        <ngt-mesh physicsSphere [sphereMass]="1" [spherePosition]="[-3, 5, 3]" [sphereMaterial]="{ restitution: 0.4 }" castShadow>
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="red"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh physicsSphere [sphereMass]="1" [spherePosition]="[-3, 5, 0]" [sphereMaterial]="{ restitution: 0.6 }" castShadow>
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="white"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh physicsSphere [sphereMass]="1" [spherePosition]="[-3, 5, -3]" [sphereMaterial]="{ restitution: 0.8 }" castShadow>
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material color="blue"></ngt-mesh-standard-material>
        </ngt-mesh>`,
})
export class BounceExample {
}


@Component({
  templateUrl: './bounce.component.html',
})
export class BounceComponent {
}
