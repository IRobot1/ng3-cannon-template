import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { Texture, TextureLoader } from "three";

import { NgtLoader } from "@angular-three/core";

import { PhysicsSphereDirective } from "../../directives/physics-sphere.directive";

@Component({
  selector: 'impulse-example',
  templateUrl: './impulse-example.component.html',
})
export class ImpulseExample implements AfterViewInit {
  @ViewChild('ci') ci!: PhysicsSphereDirective;
  @ViewChild('ti') ti!: PhysicsSphereDirective;
  @ViewChild('cf') cf!: PhysicsSphereDirective;
  @ViewChild('tf') tf!: PhysicsSphereDirective;
  @ViewChild('lf') lf!: PhysicsSphereDirective;
  @ViewChild('torque') torque!: PhysicsSphereDirective;

  constructor(
    private loader: NgtLoader,
  ) {
    this.loader.use(TextureLoader, 'assets/uv_grid_opengl.jpg').subscribe(next => {
      this.texture = next;
    });
  }

  texture!: Texture;


  ngAfterViewInit(): void {
    // center impulse
    this.ci.body.api.applyImpulse([0, 0, 5], [0, 0, 0]);

    // top impluse
    this.ti.body.api.applyImpulse([0, 0, 5], [0, 1, 0]);

    // center force
    this.cf.body.api.applyImpulse([0, 0, -5], [0, 0, 0]);

    // top force
    this.tf.body.api.applyImpulse([0, 0, -2], [0, 1, 0]);

    // local force
    this.lf.body.api.applyLocalForce([0, 0, 500], [0, 1, 0]);

    // torque
    this.torque.body.api.applyTorque([500, 0, 0]);
  }
}

@Component({
  templateUrl: './impulse.component.html',
})
export class ImpulseComponent {
}
