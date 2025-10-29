// import OpenAI from 'openai';

// const OPENAI_API_KEY = import.meta.env.VITE_OPEN_AI_SECRET_KEY;

// const openAiClient = new OpenAI({
//     apiKey: OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true,
// });

// export default openAiClient;


const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer YOUR_DEEPSEEK_API_KEY`,
  },
  body: JSON.stringify({
    model: "deepseek-chat", // or "deepseek-coder" for coding tasks
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: inputText },
    ],
    temperature: 0.7,
  }),
});

