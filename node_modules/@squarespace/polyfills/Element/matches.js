/**
 * Polyfill for Element.prototype.matches
 *
 * For the public domain version of this code, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 * Added: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches$revision/678245
 */

(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
  }
})();