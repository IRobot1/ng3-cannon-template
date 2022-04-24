import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { NgtComponentStore, NgtTriple, tapEffect } from '@angular-three/core';

class Cube {
  constructor(public name: string, public position: NgtTriple, public scale: NgtTriple, public color: string) { }
}

@Component({
  templateUrl: './conveyor.component.html',
})
export class ConveyorComponent
  extends NgtComponentStore
  implements AfterViewInit
{
  cubes: Array<Cube> = [];

  platformheight = 0.5;
  platformscale = [2, 0.2, 10] as NgtTriple;

  readonly makeBoxes = this.effect<void>(
    tapEffect(() => {
      let count = 0;
      const timer = setInterval(() => {
        if (this.cubes.length < 29) {
          const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
          const cube = new Cube('cube' + count.toString(), [3, 2, Math.random()], [Math.random(), Math.random(), Math.random()], color);
          this.cubes.push(cube);
        } else {
          this.cubes[count].position = [3, 2, Math.random()];
          if (count < this.cubes.length - 1)
            count++;
          else
            count = 0;
        }
      }, 750);
      return () => {
        clearInterval(timer);
      };
    })
  )

  ngAfterViewInit(): void {
    this.makeBoxes();
  }
}
