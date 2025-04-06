const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

console.log("BusinessBot is running...");

// Example simple command handling
const commands = {
    '.menu': () => {
        return "COMMANDES DISPONIBLES:\n.menu\n.spam [texte]\n.school\n.audio [texte]\n.logo";
    },
    '.school': () => {
        return "ASTUCE BTS : Ne mémorise pas, comprends les logiques des écritures comptables.";
    },
    '.spam': (text) => {
        return Array(10).fill(text).join("\n");
    },
    '.shadow': () => {
        return "Tu viens de croiser BusinessBot, l’arme du silence.";
    }
};

function handleCommand(commandLine) {
    const parts = commandLine.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1).join(" ");
    if (commands[cmd]) {
        return commands[cmd](args);
    } else {
        return "Commande inconnue. Tape .menu";
    }
}

// Simulated input for demo
const input = ".menu";
console.log(handleCommand(input));