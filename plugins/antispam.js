module.exports = (client, chatId, userId, message) => {
    const spamKeywords = ["spam", "flood", "ad"];
    
    if (spamKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        client.sendMessage(chatId, `${userId}, ton message a été détecté comme spam et sera supprimé.`);
        client.deleteMessage(chatId, message.id);
    }
};