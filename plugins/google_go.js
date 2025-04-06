const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Remplacer par ton ID client et secret
const client_id = '143165085427-bsbjkkh52uln9jbd3skkpn0inenp9jbl.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'YOUR_REDIRECT_URI';  // Exemple : http://localhost:3000/oauth2callback

// Crée un client OAuth2
const oauth2Client = new OAuth2Client(client_id, client_secret, redirect_uri);

// Génère l'URL d'autorisation pour demander les autorisations de l'utilisateur
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/drive',  // Remplace par l'API que tu veux utiliser
});

console.log('Authorize this app by visiting this url:', authUrl);