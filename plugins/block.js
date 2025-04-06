module.exports = (client, chatId, userId) => {
    client.sendMessage(chatId, `${userId} a été bloqué.`);
    client.blockContact(userId)
        .then(() => {
            client.sendMessage(chatId, `Utilisateur ${userId} bloqué avec succès.`);
        })
        .catch(err => {
            client.sendMessage(chatId, `Impossible de bloquer ${userId}.`);
        });
};