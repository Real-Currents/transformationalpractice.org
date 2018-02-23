/**
 * Polyfill for Element.prototype.closest, modified to remove matches portion
 * and require from matches.js.
 *
 * This code originated from a repository licensed under CC0. For the public
 * domain version, see: https://github.com/jonathantneal/closest
 */

require('./matches.js');


(function (ElementProto) {
  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this;

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }

        element = element.parentNode;
      }

      return null;
    };
  }
})(window.Element.prototype);