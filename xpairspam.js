const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const color = [
    '\x1b[31m',  // Red
    '\x1b[32m',  // Green
    '\x1b[33m',  // Yellow
    '\x1b[34m',  // Blue
    '\x1b[35m',  // Magenta
    '\x1b[36m',  // Cyan
    '\x1b[37m',  // White
    '\x1b[90m'   // Grey
];
const xeonColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve); });
};

async function XeonProject() {
    const { state } = await useMultiFileAuthState('./80/session');
    const GlobalTechInc = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    try {
        // Ask for the phone number
        const phoneNumber = await question(xeonColor + 'Enter target number🤙: ' + xColor);

        // Request the desired number of pairing codes
        const xeonCodes = parseInt(await question(xeonColor + 'Amount 😽: ' + xColor));

        if (isNaN(xeonCodes) || xeonCodes <= 0) {
            console.log('example : 20.');
            return;
        }

        // Get and display pairing codes
        for (let i = 0; i < xeonCodes; i++) {
            try {
                let code = await GlobalTechInc.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(xeonColor + `${phoneNumber} [${i + 1}/${xeonCodes}]` + xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return GlobalTechInc;
}

console.log(xeonColor + "═╗ ╦┌─┐┌─┐┌┐┌  ╔═╗┌─┐┌─┐┌┬┐  ╔╗╔┌─┐┌┬┐┬┌─┐┬┌─┐┌─┐┌┬┐┬┌─┐┌┐┌ ╔╩╦╝├┤ │ ││││  ╚═╗├─┘├─┤│││  ║║║│ │ │ │├┤ ││  ├─┤ │ ││ ││││ ╩ ╚═└─┘└─┘┘└┘  ╚═╝┴  ┴ ┴┴ ┴  ╝╚╝└─┘ ┴ ┴└  ┴└─┘┴ ┴ ┴ ┴└─┘┘└┘" + xColor);
XeonProject();