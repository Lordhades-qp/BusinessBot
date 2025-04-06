module.exports = (client, chatId, userId, message) => {
    if (message.text && message.text.includes("bug")) {
        client.sendMessage(chatId, `${userId}, le mot "bug" est interdit ici. Ton message a été supprimé.`);
        client.deleteMessage(chatId, message.id);
    }
};