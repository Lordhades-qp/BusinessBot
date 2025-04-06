module.exports = (client, chatId, sticker) => {
    // Enregistrer tous les stickers envoyés en PV avec un nouveau nom
    client.sendMessage(chatId, "Sticker sauvegardé avec succès !");
    const stickerName = `Nulle ne vole ce qui appartient au maître 𝐃𝚯𝐂 𝚫𝚪𝚰𝚳𝚫⁶⁶⁷_${Date.now()}.webp`; // Nom personnalisé pour chaque sticker

    // Enregistrer le sticker dans un dossier ou une base de données
    client.downloadMediaMessage(sticker)
        .then(media => {
            // Sauvegarde du sticker sous un nouveau nom
            fs.writeFileSync(path.join(__dirname, 'saved_stickers', stickerName), media);
            client.sendMessage(chatId, `Sticker sauvegardé sous le nom : ${stickerName}`);
        })
        .catch(err => {
            client.sendMessage(chatId, "Erreur lors de la sauvegarde du sticker.");
        });
};