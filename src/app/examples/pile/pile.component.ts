import { Component, OnDestroy } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { GetByIndex, PlaneProps, SphereProps } from "@angular-three/cannon";

class ContainerSphere {
  constructor(public position: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './pile.component.html'
})
export class PileComponent implements OnDestroy {
  spheresize = 1;
  spheres: Array<ContainerSphere> = [];

  wallsize = 10;
  floorsize = 100;

  private timer!: any;

  constructor() {
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

  getPlaneProps: GetByIndex<PlaneProps> = (index: number) => (
    {
      material: { restitution: 1 },
      args: [this.floorsize, this.floorsize]
    }
  );

  getWallProps: GetByIndex<PlaneProps> = (index: number) => (
    {
      args: [this.wallsize, this.wallsize]
    }
  );

  getSphereProps: GetByIndex<SphereProps> = (index: number) => (
    {
      mass: 1,
      args: [this.spheresize],
    }
  )
}
