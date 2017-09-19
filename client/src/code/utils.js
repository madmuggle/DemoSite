function normalizeOneWord(wordStr) {
  return wordStr[0].toUpperCase() + wordStr.slice(1).toLowerCase();
}

function normalizeNameSpell(nameStr) {
  return nameStr.split(" ").map(normalizeOneWord).join(" ");
}

export {
  normalizeNameSpell,
};
