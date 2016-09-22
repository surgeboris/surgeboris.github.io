const { throwOnNonPromise } = globalRootRequire('helpers/validators');

function applyFn(stringPromise, fn) {
  return new Promise(resolve => {
    throwOnNonPromise(stringPromise);
    stringPromise.then((str) => resolve(fn(str)));
  });
}

module.exports = applyFn;
