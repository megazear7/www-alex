const init = function(node) {
  return {
    isCurrentPage: node.page.path === node.href,
    title: node.title,
    href: node.href
  }
};

module.exports = { init: init };
