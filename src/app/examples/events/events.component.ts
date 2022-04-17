import { Component } from "@angular/core";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon/bodies";

@Component({
  templateUrl: './events.component.html',
  providers: [NgtPhysicBody],
})
export class EventsComponent {

  sphereProps = this.physicBody.useSphere(() => ({
      mass: 1,
      position: [0, 5, 0] as NgtTriple,
      onCollide: (event) => {
        console.log('The sphere just collided with the ground!')
        console.log('Collided with body:', event.body.name, event.body)
        console.log('Contact between bodies:', event.contact)
      }
  }));

  constructor(private physicBody: NgtPhysicBody) { }
}
