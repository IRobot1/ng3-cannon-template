import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  examples = [
    'bounce',
    'collision_filter',
    'collisions',
    'compound',
    'container',
    'events',
    'fixed_rotation',
    'friction',
    'impulses',
    'jenga',
    'performance',
    'pile',
    'stacks',
    'threejs',
    'trigger',
    'tween',
    'worker',
  ]

  almost = [
    'body_types',
    'convex',
    'sleep',
    'trimesh',
  ]

  todo = [
    'threejs_cloth',
    'threejs_fps',
    'threejs_mousepick',
    'threejs_voxel_fps',
    'callbacks',
    'constraints',
    'heightfield',
    'hinge',
    'ragdoll',
    'raycast_vehicle',
    'rigid_vehicle',
    'split_solver',
    'spring',
    'tear',
  ]
}
