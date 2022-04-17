import { NgtPhysicBodyReturn } from "@angular-three/cannon/bodies";

export interface Inspect {
  Pickup(): void;
  Drop(): void;
  physics: NgtPhysicBodyReturn;
}
