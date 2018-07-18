/*global AFRAME, CANNON, THREE */
/*eslint no-console: ["error", { allow: ["log"] }] */

AFRAME.registerComponent('impulse', {
  schema: {
    force: {default: 1},
  },

  init: function () {
    let bullet = this.el;
    let element = bullet.body
    console.log('impulseeeeee element:' + element)
    for (let property in element) {
      console.log('property:' + property + ', value:' + element[property]);
    }

    let rotationMatrix = bullet.getAttribute('rotation');
    let forceVector = new THREE.Vector3(0, 0, this.data.force).applyMatrix4(rotationMatrix);
    let cannonVector = new CANNON.Vec3(forceVector.x, forceVector.y, forceVector.z);
    bullet.body.applyImpulse(
      /* impulse */   cannonVector,
      /* world position */ bullet.body.position
    );
  },
});