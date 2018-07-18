/*global AFRAME */
/*eslint no-console: ["error", { allow: ["log"] }] */

const BULLET = "bullet"

AFRAME.registerComponent('main-player', {
  schema: {
    health: {default: 100}
  },

  init: function() {
    let that = this; //TODO: Why need this assign to that
    let playerEl = document.querySelector('#player');
    
    playerEl.addEventListener('collide', function (e) {
      // let element = e.detail.body.el
      // console.log('element:' + element)
      // for (let property in element) {
      //   console.log('property:' + property + ', value:' + element[property])
      // }
      // console.log('Player has collided with body #' + e.detail.body.id);
      // console.log('Original entity (playerEl):' + e.detail.target.el);  // Original entity (playerEl).
      // console.log('Other entity, which playerEl touched:' + e.detail.body.el.id);    // Other entity, which playerEl touched.
      // console.log('Stats about the collision (CANNON.ContactEquation):' + e.detail.contact);    // Stats about the collision (CANNON.ContactEquation).
      // console.log('Normal (direction) of the collision (CANNON.Vec3):' + e.detail.contact.ni); // Normal (direction) of the collision (CANNON.Vec3).
      if (e.detail.body.el.className == BULLET) {
        that.data.health -= 100;
        console.log("player health:" + that.data.health);
      }
    });
  },
}); 