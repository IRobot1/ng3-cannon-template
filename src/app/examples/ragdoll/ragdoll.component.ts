import { Component } from "@angular/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './ragdoll.component.html',
  providers: [NgtPhysicBody],
})
export class RagdollComponent {

}
