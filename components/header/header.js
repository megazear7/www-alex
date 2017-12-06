const init = function(node) {
  links = [{
      href: node.page.home.path,
      title: node.page.home.title,
      isCurrentPage: node.page.home.path === node.page.path
  }];

  node.page.home.children.forEach(function(child) {
    links.push({
      href: child.path,
      title: child.title,
      isCurrentPage: child.path === node.page.path
    });
  });

  return {
    links: links
  }
};

module.exports = { init: init };
