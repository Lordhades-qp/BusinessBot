module.exports = (client, chatId, userId) => {
    client.groupParticipantsUpdate(chatId, [userId], 'remove')
        .then(() => {
            client.sendMessage(chatId, `L'utilisateur ${userId} a été expulsé.`);
        })
        .catch(err => {
            client.sendMessage(chatId, "Impossible d'expulser l'utilisateur.");
        });
};