import { SphereProps } from "@angular-three/cannon";
import { NgtPhysicSphere } from "@angular-three/cannon/bodies";
import { NgtLoader } from "@angular-three/core";
import { AfterViewInit } from "@angular/core";
import { Component, ViewChild } from "@angular/core";
import { MeshStandardMaterialParameters, Texture, TextureLoader } from "three";

@Component({
  templateUrl: './impulse.component.html'
})
export class ImpulseComponent implements AfterViewInit {
  @ViewChild('ci') ci!: NgtPhysicSphere;
  @ViewChild('ti') ti!: NgtPhysicSphere;
  @ViewChild('cf') cf!: NgtPhysicSphere;
  @ViewChild('tf') tf!: NgtPhysicSphere;
  @ViewChild('lf') lf!: NgtPhysicSphere;
  @ViewChild('torque') torque!: NgtPhysicSphere;


  constructor(private loader: NgtLoader) {

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


  getSphereProps(): SphereProps {
    return {
      mass: 1,
      args: [1],
      linearDamping: 0.5,
      angularDamping: 0.5,
    } as SphereProps;
  }

  getSphereLocalProps(): SphereProps {
    return {
      mass: 1,
      args: [1],
      linearDamping: 0.5,
      angularDamping: 0.5,
      rotation: [Math.PI, 0, 0]
    } as SphereProps;
  }

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
