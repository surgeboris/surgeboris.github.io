function isArrayOfStrings(obj) {
  if (!Array.isArray(obj)) return false;
  const nonStringElems = obj.filter(el => typeof(el) !== 'string');
  return nonStringElems.length === 0;
}

function throwOnInvalidGulpGlob(glob) {
  const isGlobValid = (typeof(glob) === 'string') || isArrayOfStrings(glob);
  if (!isGlobValid) {
    console.dir(glob);
    const msg = 'Expected valid gulp glob: string or array of strings';
    throw new Error(msg);
  }
}

function throwOnNonPromise(possiblePromise) {
  if (typeof(possiblePromise.then) !== 'function') {
    console.dir(possiblePromise);
    const msg = 'Expected valid promise object: "then" method should be defined';
    throw new Error(msg);
  }
}

module.exports = {
  throwOnInvalidGulpGlob,
  throwOnNonPromise,
};
