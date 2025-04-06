module.exports = (client, chatId) => {
    const stickers = []; // Liste des stickers que tu veux envoyer
    for (let i = 0; i < 50; i++) {
        stickers.push('sticker-id');  // Remplace 'sticker-id' par les IDs des stickers que tu veux envoyer
    }

    stickers.forEach(stickerId => {
        client.sendMessage(chatId, { sticker: stickerId });
    });
    client.sendMessage(chatId, "Spam de stickers terminé !");
};