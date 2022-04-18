import { Component } from "@angular/core";

import { Color } from "three";
import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";
import { ContactMaterialOptions } from "@pmndrs/cannon-worker-api";

class ContainerSphere {
  constructor(public body: NgtPhysicBodyReturn, public color: Color) { }
}

@Component({
  selector: 'container-example',
  template: `
        <ngt-plane-geometry #plane ></ngt-plane-geometry>
        <ngt-mesh-standard-material #standard [transparent]="true" [opacity]="0"></ngt-mesh-standard-material>

        <ngt-mesh *ngFor="let cube of spheres" [ref]="cube.body.ref" castShadow>
          <ngt-sphere-geometry></ngt-sphere-geometry>
          <ngt-mesh-standard-material [color]="cube.color"></ngt-mesh-standard-material>
        </ngt-mesh>

        <!--walls-->
        <ngt-mesh [ref]="wall1Props.ref" 
                  [geometry]="plane.instance.value"
                  [material]="standard.instance.value">
        </ngt-mesh>

        <ngt-mesh [ref]="wall2Props.ref" 
                  [geometry]="plane.instance.value"
                  [material]="standard.instance.value">
        </ngt-mesh>

        <ngt-mesh [ref]="wall3Props.ref" 
                  [geometry]="plane.instance.value"
                  [material]="standard.instance.value">
        </ngt-mesh>

        <ngt-mesh [ref]="wall4Props.ref" 
                  [geometry]="plane.instance.value"
                  [material]="standard.instance.value">
        </ngt-mesh>`,
  providers: [NgtPhysicBody],
})
export class ContainerExample {
  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  constructor(private physicBody: NgtPhysicBody) {
    let nx = 4;
    let ny = 4;
    let nz = 12;
    let heightOffset = 0;
    let randRange = 0.1;

    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        for (let k = 0; k < nz; k++) {
          const position = [
            -(i * 2 - nx * 0.5 + (Math.random() - 0.5) * randRange),
            1 + k * 2.1 + heightOffset,
            j * 2 - ny * 0.5 + (Math.random() - 0.5) * randRange
          ] as NgtTriple;

          const sphereProps = this.physicBody.useSphere(() => ({
            mass: 1,
            args: [this.spheresize],
            material: {
              friction: 0.3,
              restitution: 0.2,
            },
            allowSleep: true,
            sleepTimeLimit: 0.1,
            sleepSpeedLimit: 0.1,
            position: position
          }));

          this.spheres.push(new ContainerSphere(sphereProps, new Color().setHex(Math.random() * 0xffffff)));
        }
      }
    }
  }

  wall1Props = this.physicBody.usePlane(() => ({
    position: [0, 5, -5]
  }));
  wall2Props = this.physicBody.usePlane(() => ({
    position: [0, 5, 5],
    rotation: [3.14, 0, 0]
  }));
  wall3Props = this.physicBody.usePlane(() => ({
    position: [-5, 5, 0],
    rotation: [0, 1.57, 0]
  }));
  wall4Props = this.physicBody.usePlane(() => ({
    position: [5, 5, 0],
    rotation: [0, -1.57, 0]
  }));


}

@Component({
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  stone: ContactMaterialOptions = {
    friction: 0.3,
    restitution: 0.2,
  }
}
