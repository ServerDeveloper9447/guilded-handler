# Guilded Command Handler

This package is inspired by discord command handlers.<br>
Supports: `Guilded.js`

![Guilded](https://img.guildedcdn.com/asset/App/Desktop_Screenshot.png)

---

## index.js
```js
const { Client } = require("guilded.js");
const client = new Client({ token: process.env.token });

client.on("ready", () => console.log(`${client.user.raw.name} is Online`));

require('guilded-handler')('./commands',client) //don't do './commands/'

client.login();
```

---

## Command file structure
```js
module.exports = {
    name: 'hello' //command name
    run: (client,message,args) => {
        // run code
    }
}
```
---
[Guilded.js docs](https://guilded.js.org)<br>
[Guilded API](https://www.guilded.gg/docs/api)

