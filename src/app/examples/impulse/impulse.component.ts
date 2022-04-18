import { AfterViewInit, Component } from "@angular/core";

import { MeshStandardMaterialParameters, Texture, TextureLoader } from "three";

import { NgtLoader } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  selector: 'impulse-example',
  templateUrl: './impulse-example.component.html',
  providers: [NgtPhysicBody],
})
export class ImpulseExample implements AfterViewInit {

  constructor(
    private physicBody: NgtPhysicBody,
    private loader: NgtLoader) {
    const s = this.loader.use(TextureLoader, 'assets/uv_grid_opengl.jpg').subscribe(next => {
      this.texture = next;
    },
      () => { },
      () => { s.unsubscribe(); }
    );
  }

  texture!: Texture;

  ci = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [-6, 0, 0],
  }));

  ti = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [-4, 0, 0],
  }));

  cf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [-2, 0, 0]
  }));

  tf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [0, 0, 0]
  }));

  lf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [2, 0, 0],
    rotation: [Math.PI, 0, 0],
  }));

  torque = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    position: [4, 0, 0],
  }));


  ngAfterViewInit(): void {
    // center impulse
    this.ci.api.applyImpulse([0, 0, 5], [0, 0, 0]);

    // top impluse
    this.ti.api.applyImpulse([0, 0, 5], [0, 1, 0]);

    // center force
    this.cf.api.applyImpulse([0, 0, -5], [0, 0, 0]);

    // top force
    this.tf.api.applyImpulse([0, 0, -5], [0, 1, 0]);

    // local force
    this.lf.api.applyLocalForce([0, 0, 500], [0, 1, 0]);

    // torque
    this.torque.api.applyTorque([500, 0, 0]);
  }
}

@Component({
  templateUrl: './impulse.component.html',
})
export class ImpulseComponent {
}
