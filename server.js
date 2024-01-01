const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('isomorphic-fetch');



const API_KEY = process.env.API_KEY

console.log("Api key = " + API_KEY);

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tryit', (req, res) => {
  res.sendFile(path.join(__dirname, 'tryit.html'));
});


// calling openai's api
const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Update the engine and endpoint based on your needs
app.use(bodyParser.json());
app.post('/generate-tweets', async (req, res) => {
  try {
    const { message } = req.body;
    const { description, tone, length } = message;
    console.log(message)
    const total = 'Return 3 tweets, Tweets like an expert copywriter. The 3 tweets should be in json format such that : {"tweet1" : item1 ,"tweet2" : item2  ,"tweet3" : tweet3 } ';
    const prompt = "Write a " + length + " tweet about " + description + " in a " + tone + " tone." + total;

    console.log("prompt used = "+ prompt);
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        max_tokens: 250
      }),
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log(JSON.stringify(data.choices[0].message.content));
    // Send the generated tweets back to the frontend
    res.send(JSON.stringify(data.choices[0].message.content));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname,'error.html'));
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
