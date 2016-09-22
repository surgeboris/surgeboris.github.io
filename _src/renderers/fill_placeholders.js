const { throwOnNonPromise } = globalRootRequire('helpers/validators');

function fillPlaceholders(stringPromise, contentObj) {
  return new Promise(resolve => {
    throwOnNonPromise(stringPromise);
    stringPromise.then((str) => resolve(str.replace(
      /\{\{(\w[^{}]+)\}\}/g,
      (match, captured) => contentObj[captured]
    )));
  });
}

module.exports = fillPlaceholders;
