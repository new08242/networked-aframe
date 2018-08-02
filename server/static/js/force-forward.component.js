/*global AFRAME, THREE, CANNON */
/*eslint no-console: ["error", { allow: ["log"] }] */

AFRAME.registerComponent('force-forward', {
  schema: {
    force: {default: 1000},
  },

  init: function () {
    let elementObject = this.el.object3D;
    let elementBody = this.el.body;

    // console.log('impulseeeeee object:' + elementBody.velocity)
    // for (let property in bulletBody) {
    //   console.log('property:' + property + ', value:' + bulletBody[property]);
    // }
    // console.log('impulseeeeee body:' + bulletBody)
    // for (let property in bulletBody) {
    //   console.log('property:' + property + ', value:' + bulletBody[property]);
    // }

    // Extract the rotation from the THREE object
    var rotationMatrix = new THREE.Matrix4();
    rotationMatrix.extractRotation(elementObject.matrix);

    // Define some impulse to apply
    // console.log('force:' + this.data.force);
    var thrustImpulse = this.data.force;

    // Calculate the vector we'll use to apply the impulse in the object's positive Z direction
    var forceVector = new THREE.Vector3(0, 0, -thrustImpulse).applyMatrix4(rotationMatrix);

    // Convert the vector to a CANNON vector, otherwise it does nothing
    var cannonVector = new CANNON.Vec3(forceVector.x, forceVector.y, forceVector.z);

    // cannonVector.mult(this.data.speed, elementBody.velocity)
    // Apply the impulse at the center of the body
    // elementBody.applyLocalImpulse(cannonVector, elementBody.position);
    elementBody.applyForce(cannonVector, elementBody.position);
  },
});