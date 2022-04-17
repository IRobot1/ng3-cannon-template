import { AfterViewInit, Component } from "@angular/core";

import { MeshStandardMaterialParameters, Texture, TextureLoader } from "three";

import { NgtLoader } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './impulse.component.html',
  providers: [NgtPhysicBody],
})
export class ImpulseComponent implements AfterViewInit {

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

  get parameters(): MeshStandardMaterialParameters {
    const p: MeshStandardMaterialParameters = {
    }
    // to avoid THREE warning if map is undefined
    if (this.texture) {
      p.map = this.texture;
    }
    return p;
  }


  ci = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  ti = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  cf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  tf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  lf = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  torque = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  sphereLocalProps = this.physicBody.useSphere(() => ({
    mass: 1,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
    rotation: [Math.PI, 0, 0]
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
