const nextKey = (lastKey) => {
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let firstCharacterOfSet = characters[0];
  let lastCharacterOfSet = characters[characters.length - 1];

  // if an undefined key or empty string is passed in, create one with the first character of characters set
  if (lastKey === undefined || lastKey === '') {
    return firstCharacterOfSet;
  }

  let newKey = lastKey.split('');

  // add an aditional character spot when we've hit the end of possible combinations for current key length
  if (newKey.every(char => char === lastCharacterOfSet)) {
    newKey.unshift(lastCharacterOfSet);
  }

  // increment key value by one, starting from the last value
  for (let i = newKey.length - 1; i >= 0; i--) {
    if (newKey[i] === lastCharacterOfSet) {
      newKey[i] = firstCharacterOfSet;
    } else {
      newKey[i] = characters[characters.indexOf(newKey[i]) + 1]
      break;
    }
  }

  return newKey.join('');
};

module.exports = nextKey;