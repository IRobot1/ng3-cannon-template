import { AfterContentInit, Component, Input } from "@angular/core";

import { Object3D } from "three";

import { NgtTriple } from "@angular-three/core";

import { NgtPhysicBody, NgtPhysicBodyReturn, NgtPhysicConstraint, NgtPhysicConstraintReturn } from "@angular-three/cannon";

@Component({
  selector: 'ragdoll-model',
  templateUrl: 'ragdoll-model.component.html',
  providers: [NgtPhysicBody, NgtPhysicConstraint],
})
export class RagdollModelComponent implements AfterContentInit {
  @Input() name = 'ragdoll';

  @Input() position = [0, 0, 0] as NgtTriple;
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

  ready = false;

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

  upperArmArgs = [this.upperArmLength, this.upperArmSize, this.upperArmSize] as NgtTriple;
  lowerArmArgs = [this.lowerArmLength, this.lowerArmSize, this.lowerArmSize] as NgtTriple;
  upperBodyArgs = [this.shouldersDistance, this.lowerArmSize, this.upperBodyLength] as NgtTriple;
  pelvisArgs = [this.shouldersDistance, this.lowerArmSize, this.pelvisLength] as NgtTriple;
  upperLegArgs = [this.upperLegSize, this.lowerArmSize, this.upperLegLength] as NgtTriple;
  lowerLegArgs = [this.lowerLegSize, this.lowerArmSize, this.lowerLegLength] as NgtTriple;

  lowerLeftLegPosition!: NgtTriple;
  lowerRightLegPosition!: NgtTriple;

  upperLeftLegPosition!: NgtTriple;
  upperRightLegPosition!: NgtTriple;

  pelvisPosition!: NgtTriple;
  upperBodyPosition!: NgtTriple;

  headPosition!: NgtTriple;

  upperLeftArmPosition!: NgtTriple;
  upperRightArmPosition!: NgtTriple;

  lowerLeftArmPosition!: NgtTriple;
  lowerRightArmPosition!: NgtTriple;

  private updatePositions() {
    this.lowerLeftLegPosition = [this.shouldersDistance / 2, 0, this.lowerLegLength / 2];
    this.lowerRightLegPosition = [-this.shouldersDistance / 2, 0, this.lowerLegLength / 2];

    this.upperLeftLegPosition = [this.shouldersDistance / 2, 0, this.lowerLeftLegPosition[2] + this.lowerLegLength / 2 + this.upperLegLength / 2];
    this.upperRightLegPosition = [-this.shouldersDistance / 2, 0, this.lowerRightLegPosition[2] + this.lowerLegLength / 2 + this.upperLegLength / 2];

    this.pelvisPosition = [0, 0, this.upperLeftLegPosition[2] + this.upperLegLength / 2 + this.pelvisLength / 2];
    this.upperBodyPosition = [0, 0, this.pelvisPosition[2] + this.pelvisLength / 2 + this.upperBodyLength / 2];

    this.headPosition = [0, 0, this.upperBodyPosition[2] + this.upperBodyLength / 2 + this.headRadius + this.neckLength];

    this.upperLeftArmPosition = [this.shouldersDistance / 2 + this.upperArmLength / 2, 0, this.upperBodyPosition[2] + this.upperBodyLength / 2];
    this.upperRightArmPosition = [-this.shouldersDistance / 2 - this.upperArmLength / 2, 0, this.upperBodyPosition[2] + this.upperBodyLength / 2];

    this.lowerLeftArmPosition = [this.upperLeftArmPosition[0] + this.lowerArmLength / 2 + this.upperArmLength / 2, 0, this.upperLeftArmPosition[2]];
    this.lowerRightArmPosition = [this.upperRightArmPosition[0] - this.lowerArmLength / 2 - this.upperArmLength / 2, 0, this.upperRightArmPosition[2]];
  }


  lowerLeftLeg!: NgtPhysicBodyReturn<Object3D>;
  lowerRightLeg!: NgtPhysicBodyReturn<Object3D>;
  upperLeftLeg !: NgtPhysicBodyReturn<Object3D>;
  upperRightLeg !: NgtPhysicBodyReturn<Object3D>;
  pelvis!: NgtPhysicBodyReturn<Object3D>;
  upperBody!: NgtPhysicBodyReturn<Object3D>;
  head!: NgtPhysicBodyReturn<Object3D>;
  upperLeftArm!: NgtPhysicBodyReturn<Object3D>;
  upperRightArm!: NgtPhysicBodyReturn<Object3D>;
  lowerLeftArm !: NgtPhysicBodyReturn<Object3D>;
  lowerRightArm !: NgtPhysicBodyReturn<Object3D>;

  neckjoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  leftKneeJoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  rightKneeJoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  leftHipJoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  rightHipJoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  spineJoint!: NgtPhysicConstraintReturn<'ConeTwist'>;
  leftShoulder!: NgtPhysicConstraintReturn<'ConeTwist'>;
  rightShoulder!: NgtPhysicConstraintReturn<'ConeTwist'>;
  leftElbowJoint !: NgtPhysicConstraintReturn<'ConeTwist'>;
  rightElbowJoint !: NgtPhysicConstraintReturn<'ConeTwist'>;


  constructor(
    private physicBody: NgtPhysicBody,
    private physicConstraint: NgtPhysicConstraint,
  ) {
  }

  sum(a: NgtTriple, b: NgtTriple): NgtTriple {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  }

  ngAfterContentInit(): void {
    this.updatePositions();

    this.lowerLeftLeg = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.lowerLeftLegPosition),
      args: this.lowerLegArgs
    }));

    this.lowerRightLeg = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.lowerRightLegPosition),
      args: this.lowerLegArgs
    }));


    this.upperLeftLeg = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.upperLeftLegPosition),
      args: this.upperLegArgs
    }));


    this.upperRightLeg = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.upperRightLegPosition),
      args: this.upperLegArgs
    }));

    this.pelvis = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.pelvisPosition),
      args: this.pelvisArgs
    }));

    this.upperBody = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.upperBodyPosition),
      args: this.upperBodyArgs
    }));

    this.head = this.physicBody.useSphere(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.headPosition),
      args: [this.headRadius]
    }));

    this.upperLeftArm = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.upperLeftArmPosition),
      args: this.upperArmArgs
    }));

    this.upperRightArm = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.upperRightArmPosition),
      args: this.upperArmArgs
    }));

    this.lowerLeftArm = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.lowerLeftArmPosition),
      args: this.lowerArmArgs
    }));

    this.lowerRightArm = this.physicBody.useBox(() => ({
      mass: this.mass,
      position: this.sum(this.position, this.lowerRightArmPosition),
      args: this.lowerArmArgs
    }));

    this.neckjoint = this.physicConstraint.useConeTwistConstraint(
      this.head.ref, this.upperBody.ref, {
      pivotA: [0, 0, -this.headRadius - this.neckLength / 2],
      pivotB: [0, 0, this.upperBodyLength / 2],
      axisA: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
      axisB: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });

    this.leftKneeJoint = this.physicConstraint.useConeTwistConstraint(
      this.lowerLeftLeg.ref, this.upperLeftLeg.ref,
      {
        pivotA: [0, 0, this.lowerLegLength / 2],
        pivotB: [0, 0, -this.upperLegLength / 2],
        axisA: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
        axisB: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
        angle: this.angle,
        twistAngle: this.twistAngle,
      });

    this.rightKneeJoint = this.physicConstraint.useConeTwistConstraint(
      this.lowerRightLeg.ref, this.upperRightLeg.ref,
      {
        pivotA: [0, 0, this.lowerLegLength / 2],
        pivotB: [0, 0, -this.upperLegLength / 2],
        axisA: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
        axisB: [0, 0, 1], // CANNON.Vec3.UNIT_Z,
        angle: this.angle,
        twistAngle: this.twistAngle,
      });

    this.leftHipJoint = this.physicConstraint.useConeTwistConstraint(
      this.upperLeftLeg.ref, this.pelvis.ref, {
      pivotA: [0, 0, this.upperLegLength / 2],
      pivotB: [this.shouldersDistance / 2, 0, -this.pelvisLength / 2],
      axisA: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      axisB: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });

    this.rightHipJoint = this.physicConstraint.useConeTwistConstraint(
      this.upperRightLeg.ref, this.pelvis.ref, {
      pivotA: [0, 0, this.upperLegLength / 2],
      pivotB: [-this.shouldersDistance / 2, 0, -this.pelvisLength / 2],
      axisA: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      axisB: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });



    this.spineJoint = this.physicConstraint.useConeTwistConstraint(
      this.pelvis.ref, this.upperBody.ref, {
      pivotA: [0, 0, this.pelvisLength / 2],
      pivotB: [0, 0, -this.upperBodyLength / 2],
      axisA: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      axisB: [0, 0, 1], //CANNON.Vec3.UNIT_Z,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });

    this.leftShoulder = this.physicConstraint.useConeTwistConstraint(
      this.upperBody.ref, this.upperLeftArm.ref, {
      pivotA: [this.shouldersDistance / 2, 0, this.upperBodyLength / 2],
      pivotB: [-this.upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      axisB: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      angle: this.angleShoulders,
    });

    this.rightShoulder = this.physicConstraint.useConeTwistConstraint(
      this.upperBody.ref, this.upperRightArm.ref, {
      pivotA: [-this.shouldersDistance / 2, 0, this.upperBodyLength / 2],
      pivotB: [this.upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      axisB: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      angle: this.angleShoulders,
      twistAngle: this.twistAngle,
    });

    this.leftElbowJoint = this.physicConstraint.useConeTwistConstraint(
      this.lowerLeftArm.ref, this.upperLeftArm.ref, {
      pivotA: [-this.lowerArmLength / 2, 0, 0],
      pivotB: [this.upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      axisB: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });
    this.rightElbowJoint = this.physicConstraint.useConeTwistConstraint(
      this.lowerRightArm.ref, this.upperRightArm.ref, {
      pivotA: [this.lowerArmLength / 2, 0, 0],
      pivotB: [-this.upperArmLength / 2, 0, 0],
      axisA: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      axisB: [1, 0, 0], // CANNON.Vec3.UNIT_X,
      angle: this.angle,
      twistAngle: this.twistAngle,
    });
    this.ready = true;
  }
}
