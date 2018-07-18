/*global AFRAME, THREE */
/*eslint no-console: ["error", { allow: ["log"] }] */

AFRAME.registerComponent('gun', {
  schema: {
    bulletTemplate: {default: '#bullet-template'},
    boxTemplate: {default: '#blue-box-template'},
    triggerKeyCode: {default: 32} // spacebar
  },

  init: function() {
    let that = this; //TODO: Why need this assign to that
    //for mobile touch to shoot
    if (AFRAME.utils.device.isMobile()) {
      document.body.addEventListener('touchstart', function(e){
        that.createBullet();
      }, false);
    }
    //for pc click to shoot
    else {
      document.body.onclick = function(e){
        that.createBullet();
      }
    }

    // document.body.onkeyup = function(e){
    //   if(e.keyCode == that.data.triggerKeyCode){
    //     that.createBullet();
    //   }
    // }
  },

  createBullet: function() {
    let scene = document.querySelector('a-scene');

    //TODO: a-entity will not spawn on shooter side, but other play will see why? a-sphere will spawn both
    let el = document.createElement('a-sphere');
    el.setAttribute('networked', 'template:' + this.data.bulletTemplate);
    el.setAttribute('remove-in-seconds', 3);
    // el.setAttribute('forward', 'speed:0.1');

    let tip = document.querySelector('#gun-tip');
    el.setAttribute('position', this.getInitialBulletPosition(tip));
    el.setAttribute('rotation', this.getInitialBulletRotation(tip));
    el.setAttribute('impulse', 10);

    scene.appendChild(el);
  },

  getInitialBulletPosition: function(spawnerEl) {
    let worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(spawnerEl.object3D.matrixWorld);
    return worldPos;
  },

  getInitialBulletRotation: function(spawnerEl) {
    let worldDirection = new THREE.Vector3();

    spawnerEl.object3D.getWorldDirection(worldDirection);
    worldDirection.multiplyScalar(-1);
    this.vec3RadToDeg(worldDirection);

    return worldDirection;
  },

  vec3RadToDeg: function(rad) {
    rad.set(rad.y * 90, -90 + (-THREE.Math.radToDeg(Math.atan2(rad.z, rad.x))), 0);
  }
});
