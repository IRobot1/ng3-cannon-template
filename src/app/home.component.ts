import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  examples = [
    'fps',
    'conveyor',
    'conditional',
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
    'mousepick',
    'body_types',
    'convex',
    'sleep',
    'trimesh',
  ]

  feature = [
    'cloth',
    'callbacks',
  ]

  todo = [
    'voxel_fps',
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
