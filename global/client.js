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
