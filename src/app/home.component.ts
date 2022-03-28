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
    'pile',
    'ragdoll',
    'raycast_vehicle',
    'rigid_vehicle',
    'shapes',
    'simple_friction',
    'split_solver',
    'spring',
    'stacks',
    'tear',
  ]
}
