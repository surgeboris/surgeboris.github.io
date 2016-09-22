const { oneLine, safeHtml } = require('common-tags');

module.exports = ({
  title,
  canonical,
  stylePromise = Promise.resolve(''),
  bodyPromise = Promise.resolve(''),
}) => Promise.all([stylePromise, bodyPromise]).then(([style, body]) => oneLine`
  <!doctype html>
  <html amp lang="en">
    <head>
      <meta charset="utf-8">
      <title>${safeHtml`${title}`}</title>
      <link rel="canonical" href="${safeHtml`${canonical}`}" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
      <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      <style amp-custom>${style}</style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
    </head>
    <body>
      ${body}
    </body>
  </html>
`);
