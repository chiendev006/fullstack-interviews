
    map[letter] = primes[index];
  });

  return map;
})();

/**
 * Hash a string using the prime number map.
 *
 * @param  {String} str
 * @return {Number}
 */
var hash = function (str) {
  return str.split('').reduce(function (memo, char) {
    return memo * primeMap[char];
  }, 1);
};

/**
 * Count the number of times a child or anagram of the child appears in the
 * parent string.
 *
 * @param  {String} parent
 * @param  {String} child
 * @return {Number}
 */
module.exports = function (parent, child) {
  var found   = 0;

  // Safety first, confirm that the child is actually smaller than the parent.
  if (parent.length < child.length) {
    return found;
  }

  var value   = hash(parent.substr(0, child.length));
  var anagram = hash(child);

  // Iterate over all substring possibilities and check the hash values.
  for (var i = child.length; i <= parent.length; i++) {
    if (value === anagram) {
      found += 1;
    }

    // Instead of naively hashing every substring, we can just recompute the
    // changed characters.
    value *= primeMap[parent[i]];
    value /= primeMap[parent[i - child.length]];
  }

  return found;
};
