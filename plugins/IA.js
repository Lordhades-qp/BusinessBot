const axios = require('axios');

// Commande IA
bot.onText(/\.ia (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1];  // Ce qui suit ".ia" sera la question

    try {
        // Utilisation de l'API GPT Mini ou un autre modèle pour répondre
        const gptApiUrl = 'https://api.openai.com/v1/completions';
        
        const response = await axios.post(gptApiUrl, {
            model: 'text-davinci-003',  // Remplacer par le modèle GPT mini ou équivalent
            prompt: question,
            max_tokens: 150,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer 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`,
            },
        });

        // Si la réponse est reçue, l'envoyer au chat
        if (response.data.choices && response.data.choices[0].text) {
            const answer = response.data.choices[0].text.trim();
            bot.sendMessage(chatId, answer);
        } else {
            bot.sendMessage(chatId, "Sorry, I couldn't find an answer to your question.");
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "An error occurred while processing your request.");
    }
});