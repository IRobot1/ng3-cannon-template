import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector:'collisionfilter-example',
  template: `
        <ngt-mesh [ref]="sphereProps.ref" [castShadow]="true">
          <ngt-sphere-geometry [args]="[0.5]"></ngt-sphere-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'red' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="boxProps.ref" [castShadow]="true">
          <ngt-box-geometry></ngt-box-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'white' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>

        <ngt-mesh [ref]="cylinderProps.ref" [castShadow]="true">
          <ngt-cylinder-geometry [args]="[0.5, 0.5, 1, 20]"></ngt-cylinder-geometry>
          <ngt-mesh-standard-material [parameters]="{ color: 'blue' | color }"></ngt-mesh-standard-material>
        </ngt-mesh>`,
  providers: [NgtPhysicBody],

})
export class CollisionFilterExample {

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 0, 3] as NgtTriple,
      velocity: [0, 0, -2] as NgtTriple,
      collisionFilterGroup: 1,
      collisionFilterMask: 2 | 4, // it can only collide with group 2 and 3
      args: [0.5]
  }));  

  boxProps = this.physicBody.useBox(() => ({
      mass: 1,
      position: [0, 0, 0] as NgtTriple,
      collisionFilterGroup: 2,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [1, 1, 1]
  }));

  cylinderProps = this.physicBody.useCylinder(() => ({
      mass: 1,
      position: [0, 0, -3] as NgtTriple,
      collisionFilterGroup: 4,
      collisionFilterMask: 1, // it can only collide with the sphere
      args: [0.5, 0.5]
  }));


  constructor(private physicBody: NgtPhysicBody) { }

}

@Component({
  templateUrl: './collision_filter.component.html',
})
export class CollisionFilterComponent {
}
