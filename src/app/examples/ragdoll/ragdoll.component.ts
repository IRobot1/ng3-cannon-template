import { NgtPhysicBody } from "@angular-three/cannon";
import { Component } from "@angular/core";

@Component({
  selector: 'ragdoll-example',
  templateUrl: './ragdoll-example.component.html',
  providers: [NgtPhysicBody],
})
export class RagdollExample {
  leftSphere = this.physicBody.useSphere(() => ({
    mass: 0,
    position: [0, 0, 4]
  }));
  middleSphere = this.physicBody.useSphere(() => ({
    mass: 0,
    position: [0, 0, -1]
  }));
  rightSphere = this.physicBody.useSphere(() => ({
    mass: 0,
    position: [0, 0, -6]
  }));


  constructor(
    private physicBody: NgtPhysicBody,
  ) { }
}

@Component({
  templateUrl: './ragdoll.component.html',
})
export class RagdollComponent {

}
