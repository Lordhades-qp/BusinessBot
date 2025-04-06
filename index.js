const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// Importation des fichiers audio et image
const menuAudio = fs.readFileSync('./Media/menu.mp3');
const menuImage1 = MessageMedia.fromFilePath('./Media/menu.png');
const menuImage2 = MessageMedia.fromFilePath('./Media/menu.jpg');

// Informations du bot
const { owner, botName, version, type, creator, status } = require('./config');
console.log(`Bot Name: ${botName}, Version: ${version}`);

// Initialisation du client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(), // Authentification locale
});

console.log(`${botName} est en cours d'exécution...`);

// Génération du QR code pour la connexion
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Veuillez scanner ce QR code pour vous connecter.');
});

// Une fois le client connecté
client.on('ready', () => {
    console.log(`${botName} est maintenant connecté à WhatsApp!`);
    showProgressBar();
});

// Fonction d'affichage de la barre de progression
function showProgressBar() {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress <= 100) {
            process.stdout.write(`\r[${'█'.repeat(progress / 10)}${'░'.repeat(10 - progress / 10)}] ${progress}%`);
            progress += 25;
        } else {
            clearInterval(interval);
            console.log('\nMenu prêt à l\'emploi');
            showMenu();
        }
    }, 1000);
}

// Affichage du menu principal et sous-menus
function showMenu() {
    console.log(`
COMMANDES DISPONIBLES:
.menu
.businessmenu
.menuspam
.school
.audio [texte]
.pdf [texte]
.googlego [texte]
.ia [texte]
.premium
    `);
}

// Fonction de gestion des commandes
const commands = {
    '.menu': (client, chatId) => {
        showLoadingBar(client, chatId); // Afficher la barre de progression
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
        }, 5000);
    },
    '.businessmenu': (client, chatId) => {
        showLoadingBar(client, chatId); // Afficher la barre de progression
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
        }, 5000);
    },
    '.menuspam': (client, chatId) => {
        showLoadingBar(client, chatId); // Afficher la barre de progression
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
        }, 5000);
    },
    '.school': () => {
        return "ASTUCE BTS : Ne mémorise pas, comprends les logiques des écritures comptables.";
    },
    '.audio': (text) => {
        return `Un audio avec le texte suivant a été généré: ${text}`;
    },
    '.pdf': (text) => {
        return `Un PDF avec le texte suivant va être généré: ${text}`;
    },
    '.googlego': (query) => {
        return `Recherche Google: ${query}`;
        // Ajoute ici l'appel à l'API de Google pour effectuer la recherche
    },
    '.ia': (query) => {
        return `Réponse IA pour: ${query}`;
        // Ajoute ici l'appel à l'API OpenAI ou autre pour générer des réponses IA
    },
    '.premium': () => {
        return "Accès Premium activé!";
    }
};

// Gestion des messages entrants
client.on('message', (message) => {
    console.log(`Message reçu: ${message.body}`);
    const response = handleCommand(message.body, client, message.from);
    message.reply(response);
});

// Fonction de gestion des commandes
function handleCommand(commandLine, client, chatId) {
    const parts = commandLine.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1).join(" ");
    if (commands[cmd]) {
        return commands[cmd](args, client, chatId);
    } else {
        return "Commande inconnue. Tape .menu pour voir les commandes disponibles.";
    }
}

// Démarrer le client WhatsApp
client.initialize();