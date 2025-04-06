const gtts = require('gtts');

module.exports = (text, lang = 'fr') => {
    const gttsInstance = new gtts(text, lang);
    const filePath = './media/audio.mp3';
    gttsInstance.save(filePath, function (err, result) {
        if (err) { throw new Error(err); }
        console.log('Audio enregistré :', filePath);
    });
};