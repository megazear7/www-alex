// Whatever is exported here will be available in examples.html during
// server side rendering underneath "model"

const init = function(node) {
  return {
    example1: "HELLO - " + node.path + " - BYE",
    example2: "My parents path is: " + node.parent.path + " yay!"
  }
};

module.exports = { init: init };
