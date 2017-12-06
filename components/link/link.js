const init = function(node) {
  return {
    isExternal: node.href.indexOf("/") !== 0,
    isCurrentPage: node.page.path === node.href,
    title: node.title,
    href: node.href
  }
};

module.exports = { init: init };
