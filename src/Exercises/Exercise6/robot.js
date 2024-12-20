import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

function createRobot(scene, basePosition) {
  // Materials
  const metal1 =  new THREE.MeshStandardMaterial( {
    color: 0xFB8526,
    metalness: 1.0,
    roughness: 0.5,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    normalScale: 1.0
  });

  const metal2 =  new THREE.MeshStandardMaterial( {
    color: 0x0A0A0A,
    metalness: 1.0,
    roughness: 0.4,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    normalScale: 1.0
  });

  // Base disc (D1)
  const cylinderGeometryD1 = new THREE.CylinderGeometry(1, 1, 0.3, 32);
  const baseDisc = new THREE.Mesh(cylinderGeometryD1, metal2);
  baseDisc.position.set(...basePosition);
  scene.add(baseDisc);

  // Rotation base disc (D2)
  const cylinderGeometryD2 = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
  const baseDisc2 = new THREE.Mesh(cylinderGeometryD2, metal1);
  // Create pivot point between base disc and rotation base disc (D1 to D2)
  const pivotPointD1toD2 = new THREE.Object3D();
  baseDisc.add(pivotPointD1toD2);
  // Set base disc 1 (D1) as reference for base disc 2 (D2)
  pivotPointD1toD2.add(baseDisc2);
  // Set position from base disc 2
  baseDisc2.position.set(0, 0.2, 0);
  baseDisc2.rotation.y = Math.PI

  // Arm 1 (A1)
  const A1Dims = [0.4, 0.8, 0.3]; // length, height, depth
  const boxGeometryA1 = new THREE.BoxGeometry(...A1Dims);
  const arm1 = new THREE.Mesh(boxGeometryA1, metal1);
  // Create pivot point between base disc 2 and arm 1 (D2 to A1)
  const pivotPointD2toA1 = new THREE.Object3D();
  baseDisc2.add(pivotPointD2toA1);
  // Set base disc 2 (D2) as reference for arm (A1)
  pivotPointD2toA1.add(arm1);
  const A1Position = [0, 0.3, 0];
  arm1.position.set(...A1Position);
  pivotPointD2toA1.rotation.z = Math.PI/4
  const V0 = [-((A1Dims[1]/2)+A1Position[1])*Math.cos(pivotPointD2toA1.rotation.z),
	      ((A1Dims[1]/2)+A1Position[1])*Math.sin(pivotPointD2toA1.rotation.z),
	      0]
	      

  // Rotation disc 1 (D3)
  const cylinderGeometryD3 = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
  const rotationDisc1 = new THREE.Mesh(cylinderGeometryD3, metal1);
  // Create pivot point between arm 1 and rotation disc 1 (A1 to D3)
  const pivotPointA1toD3 = new THREE.Object3D();
  arm1.add(pivotPointA1toD3);
  // Set arm (A1) as reference for rotation disc 1 (D3)
  pivotPointA1toD3.add(rotationDisc1);
  rotationDisc1.position.set(0, 0.4, 0.1);
  rotationDisc1.rotation.x = Math.PI/2
  rotationDisc1.rotation.y -= Math.PI/4 

  // Decoration disc 1 (D4)
  const cylinderGeometryD4 = new THREE.CylinderGeometry(0.2, 0.3, 0.1, 32);
  const rotationDisc2 = new THREE.Mesh(cylinderGeometryD4, metal2);
  // Create pivot point between rotation disc 1 and decoration disc 1 (D3 to D4)
  const pivotPointD3toD4 = new THREE.Object3D();
  rotationDisc1.add(pivotPointD3toD4);
  // Set rotation disc 1 (D3) as reference for decoration disc 1 (D4)
  pivotPointD3toD4.add(rotationDisc2);
  rotationDisc2.position.set(0, 0.3, 0);

  // Decoration disc 2 (D5)
  const cylinderGeometryD5 = new THREE.CylinderGeometry(0.3, 0.2, 0.1, 32);
  const rotationDisc3 = new THREE.Mesh(cylinderGeometryD5, metal2);
  // Create pivot point between rotation disc 1 and decoration disc 2 (D3 to D5)
  const pivotPointD3toD5 = new THREE.Object3D();
  rotationDisc1.add(pivotPointD3toD5);
  // Set rotation disc 1 (D3) as reference for decoration disc 2 (D5)
  pivotPointD3toD5.add(rotationDisc3);
  rotationDisc3.position.set(0, -0.3, 0);

  // Arm 2 (A2)
  const A2Dims = [0.4, 1.8, 0.15];
  const boxGeometryA2 = new THREE.BoxGeometry(...A2Dims);
  const arm2 = new THREE.Mesh(boxGeometryA2, metal1);
  // Create pivot point between rotation disc 1 and arm 2 (A2 to D3)
  const pivotPointA2toD3 = new THREE.Object3D();
  rotationDisc1.add(pivotPointA2toD3);
  // Set base disc 2 (D3) as reference for arm (A2)
  pivotPointA2toD3.add(arm2);
  const A2Position = [0, 1, 0.15];
  arm2.position.set(...A2Position);
  pivotPointA2toD3.rotation.x = -Math.PI/2

  // Rotation disc 3 (D6)
  const cylinderGeometryD6 = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 32);
  const rotationDisc4 = new THREE.Mesh(cylinderGeometryD6, metal1);
  // Create pivot point between arm 2 and rotation disc 3 (A2 to D6)
  const pivotPointA2toD6 = new THREE.Object3D();
  arm2.add(pivotPointA2toD6);
  // Set arm (A2) as reference for rotation disc 3 (D6)
  pivotPointA2toD6.add(rotationDisc4);
  const D6Position = [0, 0.755, -0.15];
  rotationDisc4.position.set(...D6Position);
  rotationDisc4.rotation.x = Math.PI/2
  rotationDisc4.rotation.y -= 5*Math.PI/6
  const V1 = [0, A2Position[1] + D6Position[1], 0]

  // Decoration disc 3 (D7)
  const cylinderGeometryD7 = new THREE.CylinderGeometry(0.15, 0.25, 0.1, 32);
  const rotationDisc5 = new THREE.Mesh(cylinderGeometryD7, metal2);
  // Create pivot point between rotation disc 3 and rotation disc 4 (D6 to D7)
  const pivotPointD6toD7 = new THREE.Object3D();
  rotationDisc4.add(pivotPointD6toD7);
  // Set rotation disc 3 (D6) as reference for rotation disc 4 (D7)
  pivotPointD6toD7.add(rotationDisc5);
  rotationDisc5.position.set(0, 0.3, 0);

  // Upper base (UB)
  const cylinderGeometryUB = new THREE.CylinderGeometry(0.2, 0.3, 0.8, 32);
  const upperBase = new THREE.Mesh(cylinderGeometryUB, metal1);
  // Create pivot point between rotation disc 3 and upper base (D6 to UB)
  const pivotPointD6toUB = new THREE.Object3D();
  rotationDisc4.add(pivotPointD6toUB);
  // Set rotation disc 3 (D6) as reference for upper base (UB)
  pivotPointD6toUB.add(upperBase);
  const UBPosition = [0.1, -0.3, 0.05];
  upperBase.position.set(...UBPosition);
  upperBase.rotation.x = Math.PI/2
  upperBase.rotation.z = -Math.PI/3
  const V2 = [UBPosition[0], UBPosition[2], UBPosition[1]];

  // Rotation cylinder (RC)
  const RCDims = [0.15, 0.15, 1.5];
  const cylinderGeometryRC = new THREE.CylinderGeometry(...RCDims, 32);
  const rotationCylinder = new THREE.Mesh(cylinderGeometryRC, metal2);
  // Create pivot point between upper base and rotation cylinder (UB to RC)
  const pivotPointUBtoRC = new THREE.Object3D();
  upperBase.add(pivotPointUBtoRC);
  // Set upper base (UB) as reference for rotation cylinder (RC)
  pivotPointUBtoRC.add(rotationCylinder);
  const RCPosition = [0.0, 0.6, 0.0];
  rotationCylinder.position.set(...RCPosition);

  // Pliers base (PB)
  const PBDims = [0.4, 0.4, 0.4];
  const boxGeometryPB = new THREE.BoxGeometry(...PBDims);
  const pliersBase = new THREE.Mesh(boxGeometryPB, metal1);
  // Create pivot point between Rotation cylinder and pliers base (RC to PB)
  const pivotPointRCtoPB = new THREE.Object3D();
  rotationCylinder.add(pivotPointRCtoPB);
  // Set rotation cylinder (RC) as reference for pliers base (PB)
  pivotPointRCtoPB.add(pliersBase);
  const PBPosition = [0, 0.7, 0];
  pliersBase.position.set(...PBPosition);

  // Pliers disc 1 (PD1)
  const cylinderGeometryPD1 = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
  const pliersDisc1 = new THREE.Mesh(cylinderGeometryPD1, metal1);
  // Create pivot point between pliers base and pliers disc 1 (PB to PD1)
  const pivotPointPBtoPD1 = new THREE.Object3D();
  pliersBase.add(pivotPointPBtoPD1);
  // Set pliers base (PB) as reference for pliers disc 1 (PD1)
  pivotPointPBtoPD1.add(pliersDisc1);
  pliersDisc1.position.set(0.0, 0.23, 0.175);
  pliersDisc1.rotation.x += Math.PI/2;

  // Pliers disc 2 (PD2)
  const cylinderGeometryPD2 = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
  const pliersDisc2 = new THREE.Mesh(cylinderGeometryPD2, metal1);
  // Create pivot point between pliers base and pliers disc 2 (PB to PD2)
  const pivotPointPBtoPD2 = new THREE.Object3D();
  pliersBase.add(pivotPointPBtoPD2);
  // Set pliers base (PB) as reference for pliers disc 2 (PD2)
  pivotPointPBtoPD2.add(pliersDisc2);
  pliersDisc2.position.set(0.0, 0.23, -0.175);
  pliersDisc2.rotation.x += Math.PI/2;

  // Pliers rotation cylinder (PRC)
  const PRCDims = [0.155, 0.155, 0.4];
  const cylinderGeometryPRC = new THREE.CylinderGeometry(...PRCDims, 32);
  const pliersRotationCylinder = new THREE.Mesh(cylinderGeometryPRC, metal2);
  // Create pivot point between pliers base and pliers rotation cylinder (PB to PRC)
  const pivotPointPBtoPRC = new THREE.Object3D();
  pliersBase.add(pivotPointPBtoPRC);
  // Set pliers base (PB) as reference for pliers rotation cylinder (PRC)
  pivotPointPBtoPRC.add(pliersRotationCylinder);
  const PRCJointPosition = [0.0, 0.3, 0];
  pivotPointPBtoPRC.position.set(...PRCJointPosition);
  const PRCPosition = [0.0, 0.2, 0];
  pliersRotationCylinder.position.set(...PRCPosition);
  const V3 = [RCPosition[1] + PBPosition[1] + PRCJointPosition[1], 0, 0];
  const V4 = [0, -PRCDims[2], 0];

  // Pliers decoration cylinder 2 (PDC)
  const cylinderGeometryPDC = new THREE.CylinderGeometry(0.2, 0.155, 0.15, 32);
  const pliersDecorationCylinder2 = new THREE.Mesh(cylinderGeometryPDC, metal1);
  // Create pivot point between pliers decoration cylinder and pliers decoration cylinder 2 (PRC to PDC)
  const pivotPointPRCtoPDC = new THREE.Object3D();
  pliersRotationCylinder.add(pivotPointPRCtoPDC);
  // Set pliers decoration cylinder (PCR) as reference for pliers decoration cylinder 2 (PDC)
  pivotPointPRCtoPDC.add(pliersDecorationCylinder2);
  pliersDecorationCylinder2.position.set(0.0, 0.05, 0);

  // Pliers holder 1 (PH1)
  const boxGeometryPH1 = new THREE.BoxGeometry(0.03, 0.155, 0.5);
  const pliersHolder1 = new THREE.Mesh(boxGeometryPH1, metal2);
  // Create pivot point between pliers rotation cylinder and pliers holder 1 (PRC to PH1)
  const pivotPointPRCtoPH1 = new THREE.Object3D();
  pliersRotationCylinder.add(pivotPointPRCtoPH1);
  // Set pliers rotation cylinder (PCR) as reference for pliers holder 1 (PH1)
  pivotPointPRCtoPH1.add(pliersHolder1);
  pliersHolder1.position.set(0.05, 0.2, 0);

  // Pliers holder 2 (PH2)
  const boxGeometryPH2 = new THREE.BoxGeometry(0.03, 0.155, 0.5);
  const pliersHolder2 = new THREE.Mesh(boxGeometryPH2, metal2);
  // Create pivot point between pliers rotation cylinder and pliers holder 2 (PRC to PH2)
  const pivotPointPRCtoPH2 = new THREE.Object3D();
  pliersRotationCylinder.add(pivotPointPRCtoPH2);
  // Set pliers rotation cylinder (PCR) as reference for pliers holder 2 (PH2)
  pivotPointPRCtoPH2.add(pliersHolder2);
  pliersHolder2.position.set(-0.05, 0.2, 0);

  // Pliers grabber base 1 (PGB1)
  const boxGeometryPGB1 = new THREE.BoxGeometry(0.08, 0.155, 0.3);
  const pliersGrabberBase1 = new THREE.Mesh(boxGeometryPGB1, metal2);
  // Create pivot point between pliers holder 1 and pliers grabber base 1 (PH1 to PGB1)
  const pivotPointPH1toPGB1 = new THREE.Object3D();
  pliersHolder1.add(pivotPointPH1toPGB1);
  // Set pliers rotation holder 1 (PCR) as reference for pliers grabber base 1 (PGB1)
  pivotPointPH1toPGB1.add(pliersGrabberBase1);
  pivotPointPH1toPGB1.position.set(0, 0, 0.18);
  pivotPointPH1toPGB1.rotation.x -= Math.PI/6;
  pliersGrabberBase1.position.set(-0.05, 0, 0.15);

  // Pliers grabber base 2 (PGB1)
  const boxGeometryPGB2 = new THREE.BoxGeometry(0.08, 0.155, 0.3);
  const pliersGrabberBase2 = new THREE.Mesh(boxGeometryPGB2, metal2);
  // Create pivot point between pliers holder 2 and pliers grabber base 2 (PH1 to PGB2)
  const pivotPointPH1toPGB2 = new THREE.Object3D();
  pliersHolder1.add(pivotPointPH1toPGB2);
  // Set pliers rotation holder 2 (PCR) as reference for pliers grabber base 2 (PGB2)
  pivotPointPH1toPGB2.add(pliersGrabberBase2);
  pivotPointPH1toPGB2.position.set(0, 0, -0.18);
  pivotPointPH1toPGB2.rotation.x += Math.PI/6;
  pliersGrabberBase2.position.set(-0.05, 0, -0.15);

  // Grabbing point for the robotic arm (HP)
  const holdingCoords = [0, 0.4, 0];
  const holdingPoint = new THREE.Object3D();
  pliersHolder1.add(holdingPoint);
  holdingPoint.position.set(...holdingCoords);

  // Pliers grabber 1 (PG1)
  const coneGeometryPG1 = new THREE.ConeGeometry(0.05, 0.5, 3);
  const pliersGrabber1 = new THREE.Mesh(coneGeometryPG1, metal2);
  // Create pivot point between pliers grabber base 1 and pliers grabber 1 (PGB1 to PG1)
  const pivotPointPGB1toPG1 = new THREE.Object3D();
  pliersGrabberBase1.add(pivotPointPGB1toPG1);
  // Set pliers rotation grabber base 1 (PGB1) as reference for pliers grabber 1 (PG1)
  pivotPointPGB1toPG1.add(pliersGrabber1);
  pliersGrabber1.position.set(0, 0.2, 0.1);

  // Pliers grabber 2 (PG2)
  const coneGeometryPG2 = new THREE.ConeGeometry(0.05, 0.5, 3);
  const pliersGrabber2 = new THREE.Mesh(coneGeometryPG2, metal2);
  // Create pivot point between pliers grabber base 2 and pliers grabber 2 (PGB1 to PG2)
  const pivotPointPGB2toPG2 = new THREE.Object3D();
  pliersGrabberBase2.add(pivotPointPGB2toPG2);
  // Set pliers rotation grabber base 2 (PGB2) as reference for pliers grabber 2 (PG2)
  pivotPointPGB2toPG2.add(pliersGrabber2);
  pliersGrabber2.position.set(0, 0.2, -0.1);

  // Angles to normalize joints angles to 0
  const normalizationAngles = [
    baseDisc.rotation.y,
    rotationDisc1.rotation.y,
    rotationDisc4.rotation.y + Math.PI,
    rotationCylinder.rotation.y,
    Math.PI/2,
    pliersRotationCylinder.rotation.y,
    pivotPointPH1toPGB2.rotation.x,
    pivotPointPH1toPGB1.rotation.x,
  ];

  // Values to comply with Kinestetics API
  const robotGeometry = [V0, V1, V2, V3, V4];
  
  // Robot control variables
  const robotControls = [
    baseDisc2,
    rotationDisc1,
    rotationDisc4,
    rotationCylinder,
    pivotPointPBtoPRC,
    pliersRotationCylinder,
    pivotPointPH1toPGB2,
    pivotPointPH1toPGB1,
  ]
  return [normalizationAngles, robotGeometry, robotControls, holdingPoint];
}

//Function to set all the angles for the robot
// These are set to comply with Kinematics API
function setRobotAngles(robotControls, normAngles, A) {
  robotControls[0].rotation.y = A[0] + normAngles[0];
  robotControls[1].rotation.y = A[1] + normAngles[1];
  robotControls[2].rotation.y = A[2] + normAngles[2];
  robotControls[3].rotation.y = A[3] + normAngles[3];
  robotControls[4].rotation.z = -A[4] + normAngles[4];
  robotControls[5].rotation.y = A[5] + normAngles[5];
  robotControls[6].rotation.x = A[6] + normAngles[6];
  robotControls[7].rotation.x = A[7] + normAngles[7];
}

export { setRobotAngles };
export default createRobot;
