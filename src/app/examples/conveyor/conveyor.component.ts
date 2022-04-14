import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NgtTriplet } from '@angular-three/core';
import { BoxProps, GetByIndex } from '@angular-three/cannon';


class Cube {
  constructor(public name: string, public position: NgtTriplet, public scale: NgtTriplet, public color: string) { }
}

@Component({
  templateUrl: './conveyor.component.html'
})
export class ConveyorComponent implements AfterViewInit, OnDestroy {
  cubes: Array<Cube> = [];

  platformheight = 0.5;
  platformscale = [2, 0.2, 10] as NgtTriplet;

  getPlatformProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 0,
      args: this.platformscale,
    }
  )
  getCubeProps: GetByIndex<BoxProps> = (index: number) => (
    {
      mass: 1,
      material: { friction: 0, restitution: 0.3 },
      args: [1, 1, 1],
    }
  )

  private timer!: any;

  ngAfterViewInit(): void {
    let count = 0;
    this.timer = setInterval(() => {
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
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
