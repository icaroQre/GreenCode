require('dotenv').config();
const fs = require('fs');
const OpenAI = require('openai');
const openai = new OpenAI();
const apiKey = process.env.OPENAI_API_KEY;
const assistantId = "asst_WqmOKEgPY3Kiu5Qulsi6wQa4"

// Carregar ou inicializar o armazenamento de usuários
const usersFile = './users.json';
let users = {};
if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }
  
const userThread = async (phoneNumber) => {
    if(!users[phoneNumber]){
        console.log("Número não encontrado na base de dados, criando nova thread para o usuário...")
        // cria thread com numero de usuario novo
    
        const thread = await openai.beta.threads.create();
        console.log("thread criada com sucesso...")
        
        users[phoneNumber] = { threadId: thread};
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    } else {
        console.log("Número encontrado na base de dados, retornando thread do usuário")
        console.log(users[phoneNumber].threadId.id)
    }
    return users[phoneNumber].threadId.id
}

const createMessageAssistent = async (threadId, message) => {
    if (!apiKey) {
        throw new Error("API key is not defined. Please set the OPENAI_API_KEY environment variable.");
    }

    const messageAssistent = await openai.beta.threads.messages.create(
        threadId,
        {
          role: "user",
          content: message
        }
      );

    console.log("Mensagem criada na thread" + messageAssistent)
}

const runThread = async (phoneNumber, message) => {

    const threadId = await userThread(phoneNumber)
    console.log("ID da thread: " + threadId)
    createMessageAssistent(threadId, message)

    let run = await openai.beta.threads.runs.createAndPoll(
        threadId,
        { 
          assistant_id: assistantId,
          instructions: "Apenas responda a mensagem com o que o usuário deseja"
        }
      );

    if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
        run.thread_id
    );
    console.log(messages.body.data[0].content[0].text.value)
    return messages.body.data[0].content[0].text.value
    }
}

module.exports = {
    userThread,
    createMessageAssistent,
    runThread
};

