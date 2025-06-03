const OpenAI = require('openai');

if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is not set');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function analyzeCampaign(campaign) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a marketing campaign analyzer. Analyze the campaign and provide insights."
                },
                {
                    role: "user",
                    content: `Analyze this campaign:\nName: ${campaign.name}\nMessage: ${campaign.message_template.body}\nTarget Audience: ${campaign.segment_id}`
                }
            ]
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to analyze campaign');
    }
}

module.exports = {
    openai,
    analyzeCampaign
}; 