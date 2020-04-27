/*global AFRAME */
/*eslint no-console: ["error", { allow: ["log"] }] */

AFRAME.registerComponent('remove-on-collide', {
  schema: {
    default: 1
  },

  init: function() {
    let el = this.el;

    el.addEventListener('collide', function (e) {
      console.log("collide with:", e.detail.body.el.className);
      el.setAttribute('remove-in-seconds', 0);
    });
  }
});