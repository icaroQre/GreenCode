const axios = require('axios');
require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs');
const apiKey = process.env.OPENAI_API_KEY;

const postApiAudio = async (filePath) => {
    try {

        if (!apiKey) {
            throw new Error("API key is not defined. Please set the OPENAI_API_KEY environment variable.");
        }

        // Cria uma instância de FormData
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('model', 'whisper-1');

        const headers = {
            'Authorization': `Bearer ${apiKey}`,
            ...form.getHeaders(),
        };

        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, { headers });
        
        return response.data;

    } catch (error) {
        console.error(`Erro encontrado na requisição à ${error.config?.url}`, error.message, error.response?.data);
        throw error;
    }
};

module.exports = {
    postApiAudio
};
