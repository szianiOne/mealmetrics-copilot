const { Configuration, OpenAIApi } = require('openai');
const dotenv = require("dotenv");
dotenv.config();

const { recipePrompt } = require("../../data/prompt.json");

const apiKey = process.env.OPENAI_API_KEY; // Replace with your actual API key

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// update this function to include the recipe before the try
async function generateInfo(request, res) {
    const { recipe } = request.body;
    try {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `${recipePrompt}${recipe}` }],
          max_tokens: 100,
          temperature: 0,
          n: 1,
        });
        const response = completion.data.choices[0].message.content;
        console.log(response);

        return res.status(200).json({
          success: true,
          data: response,
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
          return res.status(401).json({
            error: "Please provide a valid API key.",
          });
        }
        return res.status(500).json({
            error: error.response.data.error,
        });
    }
}

module.exports = { generateInfo };