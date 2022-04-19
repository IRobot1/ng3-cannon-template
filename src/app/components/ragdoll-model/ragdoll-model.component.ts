import { Component, Input } from "@angular/core";

import { Vector3 } from "three";

import { NgtEuler, NgtTriple } from "@angular-three/core";

import { NgtPhysicBody } from "@angular-three/cannon";

@Component({
  selector: 'ragdoll-model',
  templateUrl: 'ragdoll-model.component.html',
  providers: [NgtPhysicBody],
})
export class RagdollModelComponent {
  @Input() name = 'ragdoll';

  private _position = [0, 0, 0] as NgtTriple;
  @Input()
  get position(): NgtTriple {
    return this._position;
  }
  set position(newvalue: NgtTriple) {
    this._position = newvalue;
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));
  }

  @Input() rotation = [0, 0, 0] as NgtEuler;
  @Input() scale = 1;
  @Input() angle = 0;
  @Input() angleShoulders = 0;
  @Input() twistAngle = 0;
  @Input() mass = 1;

  // https://www.w3schools.com/colors/colors_palettes.asp 2016 palettes
  @Input() headcolor = '#f7cac9';
  @Input() bodycolor = '#034f84';
  @Input() armcolor = '#92a8d1';
  @Input() legcolor = '#f7786b';

  headRadius = 0.25 * this.scale;
  shouldersDistance = 0.5 * this.scale
  upperArmLength = 0.4 * this.scale
  lowerArmLength = 0.4 * this.scale
  upperArmSize = 0.2 * this.scale
  lowerArmSize = 0.2 * this.scale
  neckLength = 0.1 * this.scale
  upperBodyLength = 0.6 * this.scale
  pelvisLength = 0.4 * this.scale
  upperLegLength = 0.5 * this.scale
  upperLegSize = 0.2 * this.scale
  lowerLegSize = 0.2 * this.scale
  lowerLegLength = 0.5 * this.scale

  upperArmArgs = [this.upperArmLength, this.upperArmSize , this.upperArmSize ] as NgtTriple;
  lowerArmArgs = [this.lowerArmLength , this.lowerArmSize , this.lowerArmSize ] as NgtTriple;
  upperBodyArgs = [this.shouldersDistance , this.lowerArmSize , this.upperBodyLength ] as NgtTriple;
  pelvisArgs = [this.shouldersDistance , this.lowerArmSize , this.pelvisLength ] as NgtTriple;
  upperLegArgs = [this.upperLegSize , this.lowerArmSize , this.upperLegLength ] as NgtTriple;
  lowerLegArgs = [this.lowerLegSize , this.lowerArmSize , this.lowerLegLength ] as NgtTriple;

  lowerLeftLegPosition!: Vector3;
  lowerRightLegPosition!: Vector3;

  upperLeftLegPosition!: Vector3;
  upperRightLegPosition!: Vector3;

  pelvisPosition!: Vector3;
  upperBodyPosition!: Vector3;

  headPosition!: Vector3;

  upperLeftArmPosition!: Vector3;
  upperRightArmPosition!: Vector3;

  lowerLeftArmPosition!: Vector3;
  lowerRightArmPosition!: Vector3;

  private updatePositions(position: Vector3) {
    this.lowerLeftLegPosition = new Vector3(this.shouldersDistance / 2, 0, this.lowerLegLength / 2).add(position);
    this.lowerRightLegPosition = new Vector3(-this.shouldersDistance / 2, 0, this.lowerLegLength / 2).add(position);

    this.upperLeftLegPosition = new Vector3(this.shouldersDistance / 2, 0, this.lowerLeftLegPosition.z + this.lowerLegLength / 2 + this.upperLegLength / 2).add(position);
    this.upperRightLegPosition = new Vector3(-this.shouldersDistance / 2, 0, this.lowerRightLegPosition.z + this.lowerLegLength / 2 + this.upperLegLength / 2).add(position);

    this.pelvisPosition = new Vector3(0, 0, this.upperLeftLegPosition.z + this.upperLegLength / 2 + this.pelvisLength / 2).add(position);
    this.upperBodyPosition = new Vector3(0, 0, this.pelvisPosition.z + this.pelvisLength / 2 + this.upperBodyLength / 2).add(position);

    this.headPosition = new Vector3(0, 0, this.upperBodyPosition.z + this.upperBodyLength / 2 + this.headRadius + this.neckLength).add(position);

    this.upperLeftArmPosition = new Vector3(this.shouldersDistance / 2 + this.upperArmLength / 2, 0, this.upperBodyPosition.z + this.upperBodyLength / 2).add(position);
    this.upperRightArmPosition = new Vector3(-this.shouldersDistance / 2 - this.upperArmLength / 2, 0, this.upperBodyPosition.z + this.upperBodyLength / 2).add(position);

    this.lowerLeftArmPosition = new Vector3(this.upperLeftArmPosition.x + this.lowerArmLength / 2 + this.upperArmLength / 2, 0, this.upperLeftArmPosition.z).add(position);
    this.lowerRightArmPosition = new Vector3(this.upperRightArmPosition.x - this.lowerArmLength / 2 - this.upperArmLength / 2, 0, this.upperRightArmPosition.z).add(position);
  }

  neckjoint: Record<string, any> = {
    pivotA: [0, 0, -this.headRadius - this.neckLength / 2],
    pivotB: [0, 0, this.upperBodyLength / 2],
    axisA: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
    axisB: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
    angle: this.angle,
    twistAngle: this.twistAngle,
  }

  kneeJoint: Record<string, any> = {
    pivotA: [0, 0, this.lowerLegLength / 2],
    pivotB: [0, 0, -this.upperLegLength / 2],
    axisA: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
    axisB: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
    angle: this.angle,
    twistAngle: this.twistAngle,
  }

  elbowJoint: Record<string, any> = {
    pivotA: [-this.lowerArmLength / 2, 0, 0],
    pivotB: [this.upperArmLength / 2, 0, 0],
    axisA: [1, 0, 0], // CANNON.Vec3.UNIT_X,
    axisB: [1, 0, 0], // CANNON.Vec3.UNIT_X,
    angle: this.angle,
    twistAngle: this.twistAngle,
  }

  lowerLeftLegProps = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: [this.lowerLeftLegPosition.x, this.lowerLeftLegPosition.y, this.lowerLeftLegPosition.z] as NgtTriple,
      args: this.lowerLegArgs
  }));

  lowerRightLegProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.lowerRightLegPosition.x, this.lowerRightLegPosition.y, this.lowerRightLegPosition.z] as NgtTriple,
    args: this.lowerLegArgs
  }));
 

  upperLeftLegProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.upperLeftLegPosition.x, this.upperLeftLegPosition.y, this.upperLeftLegPosition.z] as NgtTriple,
    args: this.upperLegArgs
  }));
 

  upperRightLegProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.upperRightLegPosition.x, this.upperRightLegPosition.y, this.upperRightLegPosition.z] as NgtTriple,
    args: this.upperLegArgs
  }));

  pelvisProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.pelvisPosition.x, this.pelvisPosition.y, this.pelvisPosition.z] as NgtTriple,
    args: this.pelvisArgs
  }));

  upperBodyProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.upperBodyPosition.x, this.upperBodyPosition.y, this.upperBodyPosition.z] as NgtTriple,
    args: this.upperBodyArgs
  }));

  headProps = this.physicBody.useSphere(() => ({
      mass: this.mass,
      position: [this.headPosition.x, this.headPosition.y, this.headPosition.z] as NgtTriple,
      args: [this.headRadius]
  }));

  upperLeftArmProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.upperLeftArmPosition.x, this.upperLeftArmPosition.y, this.upperLeftArmPosition.z] as NgtTriple,
    args: this.upperArmArgs
  }));

  upperRightArmProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.upperRightArmPosition.x, this.upperRightArmPosition.y, this.upperRightArmPosition.z] as NgtTriple,
    args: this.upperArmArgs
  }));

  lowerLeftArmProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.lowerLeftArmPosition.x, this.lowerLeftArmPosition.y, this.lowerLeftArmPosition.z] as NgtTriple,
    args: this.lowerArmArgs
  }));

  lowerRightArmProps = this.physicBody.useBox(() => ({
    mass: this.mass,
    position: [this.lowerRightArmPosition.x, this.lowerRightArmPosition.y, this.lowerRightArmPosition.z] as NgtTriple,
    args: this.lowerArmArgs
  }));


  constructor(private physicBody: NgtPhysicBody) { 
    this.updatePositions(new Vector3(this.position[0], this.position[1], this.position[2]));
  }
}
