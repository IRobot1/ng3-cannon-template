import { Component, OnDestroy } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

class ContainerSphere {
  constructor(public position: NgtTriple, public color: string) { }
}

@Component({
  templateUrl: './pile.component.html',
  providers: [NgtPhysicBody],
})
export class PileComponent implements OnDestroy {
  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  wallsize = 10;
  floorsize = 100;

  private timer!: any;

  constructor(private physicBody: NgtPhysicBody) {
    let i = 0;
    let max = 100;

    this.timer = setInterval(() => {

      if (this.spheres.length < max) {
        this.spheres.push(new ContainerSphere(
          [-this.spheresize * 2 * Math.sin(i), this.spheresize * 2 * 7, this.spheresize * 2 * Math.cos(i)],
          '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0'))
        );
        i++;
      } else {
        if (i == max)
          i = 0;
        else
          i++;
        this.spheres[i].position = [-this.spheresize * 2 * Math.sin(i), this.spheresize * 2 * 7, this.spheresize * 2 * Math.cos(i)];
      }
    }, 100)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  wallProps = this.physicBody.usePlane(() => ({
      args: [this.wallsize, this.wallsize]
  }));

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 1,
      args: [this.spheresize],
  }));
}
