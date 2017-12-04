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
