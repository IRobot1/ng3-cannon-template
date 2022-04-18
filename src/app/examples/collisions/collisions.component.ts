import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";


@Component({
  selector:'collisions-example',
  template: `
        <!-- sphere and sphere -->
        <ngt-mesh [ref]="sphere1Props.ref" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'red' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="sphere2Props.ref" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'red' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <!-- sphere and box-->
        <ngt-mesh [ref]="boxProps.ref" [castShadow]="true">
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'white' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="sphere3Props.ref" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'red' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <!-- sphere and cylinder -->
        <ngt-mesh [ref]="cylinderProps.ref" [castShadow]="true">
          <ngt-cylinder-geometry [args]="[0.5, 0.5, 1, 20]"></ngt-cylinder-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'blue' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="sphere4Props.ref" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'red' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class CollisionsExample {
  sphere1Props = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, 5] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [0.5]
  }));

  sphere2Props = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, -3] as NgtTriple,
      velocity: [0, 0, 2] as NgtTriple,
      args: [0.5]
  }));

  boxProps = this.physicBody.useBox(() => ({
      mass: 2,
      position: [-0.9, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [1, 1, 1]
  }));
  sphere3Props = this.physicBody.useSphere(() => ({
    mass: 2,
    position: [-1, 0, -3] as NgtTriple,
    velocity: [0, 0, 2] as NgtTriple,
    args: [0.5]
  }));

  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 3,
      position: [-1.9, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      args: [0.5, 0.5]
  }));
  sphere4Props = this.physicBody.useSphere(() => ({
      mass: 3,
      position: [-2, 0, -3] as NgtTriple,
      velocity: [0, 0, 2] as NgtTriple,
      args: [0.5]
  }));


  constructor(private physicBody: NgtPhysicBody) { }
}

@Component({
  templateUrl: './collisions.component.html',
})
export class CollisionsComponent {
}
