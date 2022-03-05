import { NgtPhysicBox } from "@angular-three/cannon/bodies";

export interface Inspect {
  Pickup(): void;
  Drop(): void;
  physics: NgtPhysicBox;
}
