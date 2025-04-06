module.exports = (text) => {
    // Spam extrêmement puissant, répète le texte 9 000 000 de fois
    return Array(9000000).fill(text).join("\n");
};