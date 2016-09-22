const { oneLine } = require('common-tags');

const page = globalRootRequire('components/layout_amp');
const stylus = globalRootRequire('renderers/stylus_autoprefixer_cssmin');
const markdown = globalRootRequire('renderers/markdown_amp');
const fillPlaceholders = globalRootRequire('renderers/fill_placeholders');
const applyFn = globalRootRequire('renderers/apply_fn');

const contentParts = {
  'test-image': oneLine`
    <amp-img src="/assets/img/amp.jpg" width="1080" height="610"
      layout="responsive" alt="an image"></amp-img>`,
};

let bodyPromise = markdown(['../README.md', './content/index.md']);
bodyPromise = fillPlaceholders(bodyPromise, contentParts);
bodyPromise = applyFn(bodyPromise, html => oneLine`
  <div class="container content">${html}</div>
`);

const pageData = {
  title: 'The index page of my blog',
  cannonical: 'http://surgeboris.github.io/',
  bodyPromise,
  stylePromise: stylus(['./styles/{base,slug}.styl']),
};

module.exports = page(pageData);
