const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateOffer = async (lead) => {

  const prompt = `
  Müşteri bilgileri:

  İsim: ${lead.name}
  Hizmet: ${lead.service}
  Bütçe: ${lead.budget}

  Profesyonel bir satış teklifi yaz.
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;

};