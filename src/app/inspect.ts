import { Group } from "three";

export interface Inspect {
  Pickup(controller: Group): void;
  Drop(controller: Group): void;
}
