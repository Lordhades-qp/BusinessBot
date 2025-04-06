module.exports = (client, chatId, userId) => {
    // Exemple d'une simple vérification pour détecter les bots (utilisation d'une API ou d'une liste d'ID connus)
    const knownBots = ["bot1", "bot2"]; // Liste d'ID de bots connus
    if (knownBots.includes(userId)) {
        client.sendMessage(chatId, `L'utilisateur ${userId} a été identifié comme un bot et a été expulsé.`);
        client.groupParticipantsUpdate(chatId, [userId], 'remove');
    }
};