import { Component } from "@angular/core";

import { Color, Texture, TextureLoader } from "three";

import { NgtLoader, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

class Obstacle {
  constructor(public position: NgtTriple, public color: Color) { }
}

@Component({
  selector: 'rolling-example',
  templateUrl: './rolling-example.component.html',
})
export class RollingExampleComponent {
  boxsize = 1;

  cubes: Array<Obstacle> = [];

  constructor() {
    for (let i = 0; i < 30; i++) {
      const position = [
        -10 + Math.random() * 20,
        Math.random() + 1,
        -10 + Math.random() * 20
      ] as NgtTriple;

      this.cubes.push(new Obstacle(position, new Color().setHex(Math.random() * 0xffffff)));
    }
  }
}

@Component({
  templateUrl: './rolling.component.html',
})
export class RollingComponent {
  ballsize = 0.5;
  texture!: Texture;

  constructor(
    private loader: NgtLoader,
  ) {
    this.loader.use(TextureLoader, 'assets/uv_grid_opengl.jpg').subscribe(next => {
      this.texture = next;
    });
  }
}
