import { Component } from "@angular/core";

import { NgtTriplet } from "@angular-three/core";

import { PlaneProps, SphereProps } from "@angular-three/cannon";

@Component({
  templateUrl: './events.component.html'
})
export class EventsComponent {

  getSphereProps(): SphereProps {
    return {
      mass: 1,
      position: [0, 5, 0] as NgtTriplet,
      onCollide: (event) => {
        console.log('The sphere just collided with the ground!')
        console.log('Collided with body:', event.body.name, event.body)
        console.log('Contact between bodies:', event.contact)
      }
    } as SphereProps;
  }
}
