import { Component } from "@angular/core";

import { Color, Texture, TextureLoader } from "three";

import { NgtLoader, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn } from "@angular-three/cannon";

class Obstacle {
  constructor(public body: NgtPhysicBodyReturn, public color: Color) { }
}

@Component({
  selector: 'rolling-example',
  templateUrl: './rolling-example.component.html',
  providers: [NgtPhysicBody],
})
export class RollingExampleComponent {
  boxsize = 1;

  cubes: Array<Obstacle> = [];

  constructor(
    private physicBody: NgtPhysicBody,
  ) {
    for (let i = 0; i < 30; i++) {
      const position = [
        -10 + Math.random() * 20,
        Math.random() + 1,
        -10 + Math.random() * 20
      ] as NgtTriple;
      const body = this.physicBody.useBox(() => ({
        mass: 1,
        material: { friction: 1, restitution: 0.3 },
        args: [this.boxsize, this.boxsize, this.boxsize],
        position: position,
      }));
      this.cubes.push(new Obstacle(body, new Color().setHex(Math.random() * 0xffffff)));
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
