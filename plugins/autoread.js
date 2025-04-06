module.exports = (client, chatId) => {
    client.sendMessage(chatId, "Lecture automatique des messages activée.");
    client.setAutoRead(chatId, true)
        .then(() => {
            client.sendMessage(chatId, "Tous les messages seront désormais lus automatiquement.");
        })
        .catch(err => {
            client.sendMessage(chatId, "Impossible d'activer la lecture automatique.");
        });
};