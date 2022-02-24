import { NgtPhysicBox } from "@angular-three/cannon/bodies";
import { Group } from "three";

export interface Inspect {
  Pickup(controller: Group): void;
  Drop(controller: Group): void;
  physics: NgtPhysicBox;
}
