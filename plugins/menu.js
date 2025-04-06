const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

// Importation des fichiers audio et image
const menuAudio = fs.readFileSync('./Media/menu.mp3');
const menuImage1 = MessageMedia.fromFilePath('./Media/menu.png');
const menuImage2 = MessageMedia.fromFilePath('./Media/menu.jpg');

// Fonction pour afficher la barre de progression
function showLoadingBar(client, chatId) {
    const loadingStages = [
        "[░░░░░░░░░░] 0%",
        "[██░░░░░░░░] 25%",
        "[████░░░░░░] 50%",
        "[██████░░░░] 75%",
        "[██████████] 100%"
    ];

    let stageIndex = 0;

    // Envoie chaque étape de la barre de progression
    const interval = setInterval(() => {
        client.sendMessage(chatId, loadingStages[stageIndex]);
        stageIndex++;

        if (stageIndex === loadingStages.length) {
            clearInterval(interval); // Arrêter l'intervalle lorsque la barre est remplie
        }
    }, 1000); // Changer la progression chaque seconde
}

// Fonction qui gère le menu principal et les sous-menus
module.exports = (client, chatId, command) => {
    // Si la commande est ".menu", afficher le menu principal
    if (command === '.menu') {
        showLoadingBar(client, chatId); // Afficher la barre de progression

        // Après la barre de progression, envoyer le menu principal
        setTimeout(() => {
            const mainMenuMessage = `
┏═━ **MAIN MENU** ━━
║◦ɴᴀᴍᴀ: **BUSINESS BOT**
║◦sᴛᴀᴛᴜs: (public ou privé)
║◦ɴᴀᴍᴇ: (nom de l'utilisateur)
┗━━━━━━━━━━━━

[ 𝗢 𝗪 𝗡 𝗘 𝗥 - 𝗜 𝗡 𝗙 𝗢 ]

> 𖥔 ︳ᴄʀᴇᴀᴛᴏʀ : 𝐃𝚯𝐂 𝚫𝚪𝚰𝚳𝚫⁶⁶⁷ ︳ɴᴀᴍᴀ ʙᴏᴛ : **BUSINESS BOT** ︳ᴠᴇʀsɪ : 2.0.0  ︳ᴛʏᴘᴇ : $ MULTI DEVICE ︳ᴡʜᴀᴛsᴀᴘᴘ ᴏᴡɴᴇʀ : +2250565647864
           
> ║◦MENU 1 : BUSINESS MENU 
> ║◦MENU 2 : MENUSPAM

┏═━ **OTHER MENU** ━━
║◦sticker
║◦tag
║◦group
 ||*autorecording
 ||*autoread
 ||*auto-save
┗━━━━━━━━━━━━
> https://whatsapp.com/channel/0029VatUVBSHrDZcV6K0DH0I
`;

            client.sendMessage(chatId, mainMenuMessage);
            client.sendMessage(chatId, menuAudio, { sendAudioAsMessage: true });
            client.sendMessage(chatId, menuImage1, { caption: "MENU BUSINESS" });
        }, 5000); // Le menu principal s'affiche après 5 secondes (fin du chargement)
    }

    // Si la commande est ".businessmenu", afficher le menu Business
    if (command === '.businessmenu') {
        showLoadingBar(client, chatId); // Afficher la barre de progression

        // Après la barre de progression, envoyer le menu Business
        setTimeout(() => {
            const businessMenuMessage = `
╭──── ᴍᴇɴᴜ 1  ────╮
 |*School
 |*Audio
 |*Pdf
 |*Google Go 
 |*IA
 |*Premium
╰─❒━━━━━━━━━━━❒─╯
> https://whatsapp.com/channel/0029VatUVBSHrDZcV6K0DH0I
`;
            client.sendMessage(chatId, businessMenuMessage);
        }, 5000); // Le menu Business s'affiche après 5 secondes
    }

    // Si la commande est ".menuspam", afficher le menu Spam
    if (command === '.menuspam') {
        showLoadingBar(client, chatId); // Afficher la barre de progression

        // Après la barre de progression, envoyer le menu Spam
        setTimeout(() => {
            const spamMenuMessage = `
╭──── ᴍᴇɴᴜ 2 ────╮
├ *antibug
 |*antibot
 |*antispam 
 |*bugchat
 |*spam [+225...]
 |*block
 |*kick
 |*spam-sticker
 |*xpairspam 💀[+225...]
╰─❒━━━━━━━━━━━❒─╯
> https://whatsapp.com/channel/0029VatUVBSHrDZcV6K0DH0I
━─━─━─━─━─━─━─━─━ 𝐃𝚯𝐂 𝚫𝚪𝚰𝚳𝚫⁶⁶⁷
`;
            client.sendMessage(chatId, spamMenuMessage);
        }, 5000); // Le menu Spam s'affiche après 5 secondes
    }
};