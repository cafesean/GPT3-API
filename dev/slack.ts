const { axios } = require('axios');
const { App } = require('@slack/bolt');
import dotenv from "dotenv";

dotenv.config();

/* 
This sample slack application uses SocketMode
For the companion getting started setup guide, 
see: https://slack.dev/bolt-js/tutorial/getting-started 
*/
console.log("SLACK_APP_TOKEN=", process.env.SLACK_APP_TOKEN);
// Initializes your app with your bot token and app token
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
  // clientId: process.env.SLACK_CLIENT_ID,
  // clientSecret: process.env.SLACK_CLIENT_SECRET,
  // stateSecret: 'my-state-secret',
  // scopes: ['channels:read', 'groups:read', 'channels:manage', 'chat:write']
});

// Listens to incoming messages that contain "hello"
app.message(async ({ message, say }) => {
  // let completion = await gpt3(prompt);

  // return response.data;

  var completion = "completion: " + await gpt(message.text);

  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": completion
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: completion
  });
  console
  // resolve;
})
// console.log("promise complete");
// promises.all()


app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();



async function gpt(prompt:string) {


  const engine = "text-davinci-003";
  const paramTemp = 0.7;
  const paramToken = 300;

  var temperature = new Number(process.env.TEMPERATURE);
  var tokens = new Number(process.env.MAX_TOKENS);

  if (paramTemp < 1) {
    temperature = paramTemp;
  }
  if (paramToken < 1000) {
    tokens = paramToken;
  }

  const apiUrl = 'https://api.openai.com/v1/engines/' + engine + '/completions';


  const postData = JSON.stringify({
    prompt: prompt,
    max_tokens: tokens,
    temperature: temperature
  });

  const options = {
    hostname: apiUrl,
    method: 'POST',
    port: 80,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + process.env.OPENAI_API_KEY,
    },
  };

  console.log("postData = ", postData);
  console.log("options = ", options);
  var completion = "";

  try {

  //   const http = require("https");
  //   console.log("before http req");
  //   http.POST(options, (resp) => {
  //     let data = '';

  //     // A chunk of data has been received.
  //     resp.on('data', (chunk) => {
  //       data += chunk;
  //     });

  //     // The whole response has been received. Print out the result.
  //     resp.on('end', () => {
  //       completion = JSON.stringify(data);

  //     });

  //   }).on("error", (err) => {
  //     console.log("Error message: " + err.message);
  //   });


  //   return completion;

  // } catch (e) {
  //   console.log("error", e);
  //   return ("error");
  // }

  // req.end();


  const data = {
    prompt: prompt,
    max_tokens: tokens,
    temperature: temperature,
  };
  const options = {
    headers: {
      "Content-Type": `application/json`,
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    }
  };



  console.log("before axios");

  console.log("apiUrl=", apiUrl);
  console.log("data=", data);
  console.log("options=", options);

  // new Promise((_, reject) => setTimeout(reject, 1000));
  console.log("begin try");
  // console.log("in promise");
  const response = await axios.post(
    apiUrl,
    {
      prompt: prompt,
      max_tokens: tokens,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + process.env.OPENAI_API_KEY,
      }
    }
  )
  return response.data.completion;
  // ;
}
catch (e) {
  console.log("error", e);
  return ("error");
}
}
