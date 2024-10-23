require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;

const apiChat = axios.create({
    baseURL: 'https://api.openai.com/v1/chat/completions',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    }
});

const postApiText = async (message) => {
    try {
        if (!apiKey) {
            throw new Error("API key is not defined. Please set the OPENAI_API_KEY environment variable.");
        }

        const response = await apiChat.post('', {
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        });

        return response.data;

    } catch (error) {
        console.error(`Erro encontrado na requisição à ${apiChat.defaults.baseURL}`, error.message, error.response?.data);
        throw error;
    }
};

module.exports = {
    postApiText
};
