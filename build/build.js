const init = function(node) {

  var links = [];
  var page = node.page;

  while (! page.isHome) {
    links.push({ href: page.path, title: page.title});
    page = page.parent
  }

  links.push({ href: page.path, title: page.title});
  links.reverse();

  return {
    links: links
  }
};

module.exports = { init: init };
// Whatever is exported here will be available in examples.html during
// server side rendering underneath "model"

const init = function(node) {
  return {
    example1: "HELLO - " + node.path + " - BYE",
    example2: "My parents path is: " + node.parent.path + " yay!"
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
