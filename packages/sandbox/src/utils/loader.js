const pages = require('./pages');
const fm = require('front-matter');
const fs = require('fs');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

module.exports = function (content) {
  const data = pages.map((page) => {
    const content = page.assets.md
      ? fs.readFileSync(page.assets.md, 'utf-8')
      : '';

    const frontMatter = page.assets.md ? fm(content) : {};

    return {
      ...page,
      data: frontMatter.attributes,
      content: frontMatter.body ? md.render(frontMatter.body) : '',
    };
  });

  const isPage = this.resourcePath.indexOf('/pages/') > -1;

  if (isPage) {
    const page = data.find((el) => el.path === this.resourcePath);

    if (page.assets.md) {
      this.addDependency(page.assets.md);
    }

    const twig = `
      {% set page = ${JSON.stringify(page)} %}
      {% set pages = ${JSON.stringify(data)} %}

      {% extends '${__dirname}/../templates/base.twig' %}
      {% block content %}
        ${content}
      {% endblock %}
    `;

    return twig;
  }

  return content;
};
