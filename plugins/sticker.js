module.exports = (client, chatId, imageBuffer) => {
    client.sendMessage(chatId, { sticker: imageBuffer });
};