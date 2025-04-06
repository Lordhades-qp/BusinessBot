module.exports = (client, chatId) => {
    client.sendMessage(chatId, "Enregistrement automatique activé !");
    client.startRecording(chatId)
        .then(() => {
            client.sendMessage(chatId, "Enregistrement des messages activé.");
        })
        .catch(err => {
            client.sendMessage(chatId, "Impossible d'activer l'enregistrement.");
        });
};