# Guilded Command Handler
## Warning: This version is **experimental**
This package is inspired by discord command handlers.<br>
Supports: `Guilded.js`

![Installed](https://img.shields.io/npm/dw/guilded-handler?label=Installs&style=for-the-badge)

---

## index.js
```js
const { Client } = require("guilded.js");
const client = new Client({ token: process.env.token });

client.on("ready", () => console.log(`${client.user.raw.name} is Online`));

require('guilded-handler')(client,{path_to_dir:"./commands",prefix:"A!" /*Or (client,message) => { Do something }*/ }) //don't do './commands/'

client.login();
```

---

## Command file structure
```js
module.exports = {
    name: 'hello' //command name (required)
    aliases: ["hel"], //optional
    run: (client,message,args) => { //(required)
        // run code
    }
}
```
---

## Features

+ Loaded commands map
```js
// To access it
<BotClient>.commands
```
+ Refreshes commands without restarting the bot
```js
// To refresh
<BotClient>.cmd.load()
// Experimental
```
+ Can load a whole directory. You can freely categorize the commands by many folders as you want.
+ Prefix option can be a function so you can implement custom prefixes or you say, "Guild specific prefix or User specific prefix"
+ Supports command aliases
+ And more...

---

## What's new
+ Added command loader. Can load commands without restarting the bot

---

## Coming soon...
+ Event commands handling

---
[Guilded.js docs](https://guilded.js.org)<br>
[Guilded API](https://www.guilded.gg/docs/api)