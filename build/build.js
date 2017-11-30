const init = function(node) {
  return {
    example1: "HELLO - " + node.path + " - BYE",
    example2: "My parents path is: " + node.parent.path + " yay!"
  }
};

module.exports = { init: init };
const init = function(node) {
  return {
    example: "HELLO - " + node.path + " - BYE"
  }
};

module.exports = { init: init };
var getBreakpoint = function () {
  return window.getComputedStyle(window.document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '');
};

function breakpoint(breakpoint, callback) {
  if (typeof callback === "function") {
    if (getBreakpoint() === breakpoint) {
      callback();
    }
    $(window).resize(function () {
      if (getBreakpoint() === breakpoint) {
        callback();
      }
    });
  } else {
    return getBreakpoint() === breakpoint;
  }
}

function desktop(callback) {
  return breakpoint("desktop", callback);
}

function tablet(callback) {
  return breakpoint("tablet", callback);
}

function phone(callback) {
  return breakpoint("phone", callback);
}
