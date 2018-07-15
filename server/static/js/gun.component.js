/*global AFRAME, THREE */

AFRAME.registerComponent('gun', {
  schema: {
    bulletTemplate: {default: '#bullet-template'},
    boxTemplate: {default: '#blue-box-template'},
    triggerKeyCode: {default: 32} // spacebar
  },

  init: function() {
    let that = this; //TODO: Why need this assign to that
    document.body.onkeyup = function(e){
      if(e.keyCode == that.data.triggerKeyCode){
        that.createBullet();
      }
    }
    // document.body.onclick = function(e){
    //   that.spawnBox();
    // }
  },

  spawnBox: function() {
    let scene = document.querySelector('a-scene');

    let el = document.createElement('a-box');
    el.setAttribute('networked', 'template:' + this.data.boxTemplate);
    el.setAttribute('remove-in-seconds', 3);
    el.setAttribute('forward', 'speed:0.3');

    let tip = document.querySelector('#gun-tip');
    el.setAttribute('position', this.getInitialBulletPosition(tip));
    el.setAttribute('rotation', this.getInitialBulletRotation(tip));

    scene.appendChild(el);
  },

  createBullet: function() {
    let scene = document.querySelector('a-scene');

    let el = document.createElement('a-sphere');//TODO: a-entity will not spawn on shooter but other play will see why? a-sphere will spawn both
    el.setAttribute('networked', 'template:' + this.data.bulletTemplate);
    el.setAttribute('remove-in-seconds', 3);
    el.setAttribute('forward', 'speed:0.1');

    let tip = document.querySelector('#gun-tip');
    el.setAttribute('position', this.getInitialBulletPosition(tip));
    el.setAttribute('rotation', this.getInitialBulletRotation(tip));

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
