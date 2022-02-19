import { Component } from '@angular/core';

import { NgtEuler, NgtTriplet, NgtVector3 } from '@angular-three/core';

import { BoxProps, GetByIndex } from '@angular-three/cannon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  position = [0, 2, 0] as NgtVector3;
  rotation = [0, 0, 0] as NgtEuler;

  getCubeProps: GetByIndex<BoxProps> = () => ({
    mass: 1,
    position: this.position as NgtTriplet,
    rotation: this.rotation as NgtTriplet,
  });
}
