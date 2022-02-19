import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hover = false;
  active = false;

  onAnimate(mesh: THREE.Object3D) {
    mesh.rotation.x = mesh.rotation.y += 0.01;
  }
}
