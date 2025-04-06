module.exports = (client, chatId, userId) => {
    client.groupParticipantsUpdate(chatId, [userId], 'remove')
        .then(() => {
            client.sendMessage(chatId, `L'utilisateur ${userId} a été banni.`);
        })
        .catch(err => {
            client.sendMessage(chatId, "Impossible de bannir l'utilisateur.");
        });
};  