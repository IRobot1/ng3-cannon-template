import { Component, OnDestroy } from "@angular/core";

import { Color } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";

class ContainerSphere {
  constructor(public body: NgtPhysicBodyReturn, public color: Color) { }
}

@Component({
  selector: 'pile-example',
  templateUrl: './pile-example.component.html',
  providers: [NgtPhysicBody],
})
export class PileExample implements OnDestroy {
  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  private timer!: any;

  constructor(private physicBody: NgtPhysicBody) {
    let i = 0;
    let max = 100;

    this.timer = setInterval(() => {
      const position = [
        -this.spheresize * 2 * Math.sin(i),
        this.spheresize * 2 * 7,
        this.spheresize * 2 * Math.cos(i)
      ] as NgtTriple;

      if (this.spheres.length < max) {
        const body = this.physicBody.useSphere(() => ({
          mass: 1,
          args: [this.spheresize],
          position: position,
        }));

        this.spheres.push(new ContainerSphere(body, new Color().setHex(Math.random() * 0xffffff)));
        i++;
      } else {
        if (i < max - 1)
          i++;
        else
          i = 0;
        this.spheres[i].body.api.position.set(position[0], position[1], position[2]);
      }
    }, 100)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  wall1Props = this.physicBody.usePlane(() => ({
    position: [0, 5, -5],
    rotation: [0, 0, 0],
  }));

  wall2Props = this.physicBody.usePlane(() => ({
    position: [0, 5, 5],
    rotation: [3.14, 0, 0],
  }));
  wall3Props = this.physicBody.usePlane(() => ({
    position: [-5, 5, 0],
    rotation: [0, 1.57, 0],
  }));
  wall4Props = this.physicBody.usePlane(() => ({
    position: [5, 5, 0],
    rotation: [0, -1.57, 0],
  }));

}

@Component({
  templateUrl: './pile.component.html',
})
export class PileComponent {
}
