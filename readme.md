# **Guilded Command Handler**
This package is inspired by discord command handlers.<br>
Supports: `Guilded.js`

![Installs](https://img.shields.io/npm/dw/guilded-handler?label=Installs&style=for-the-badge)

Note: This package doesn't use Guilded.js 's built-in command class. Instead it uses easy-to-understand simple logic.<br>
_We will surely support using the command class in the future because it has more features._<br>
Note: This package is for beginners. Advanced users should use the command class and custom code for their command handler.

---

## index.js
```js
const { Client } = require("guilded.js");
const client = new Client({ token: process.env.token });

client.on("ready", () => console.log(`${client.user.raw.name} is Online`));

require('guilded-handler')(client,{
    path_to_dir:"./commands",
    prefix:"A!" /*Or (client,message) => { Do something }*/,statuses:{
        interval:10000 /* must be over 10000 */,
        arr:[
                {
                content:"Hello!",
                emoteId:0000000
                },...,...
            ]
        }
    })

client.login();
```

---

## Command file structure
```js
module.exports = {
    name: 'hello', //command name (required)
    aliases: ["hel"], //optional
    disabled: false, //optional (default=false)
    run: (client,message,args) => { //(required)
        // run code
    }
}
```
---

## Features
+ Lightweight
+ Fast loading
+ Loaded commands map
```js
// To access it
<GuildedJSBotClient>.commands
```
+ Refreshes commands without restarting the bot
```js
// To refresh
<GuildedJSBotClient>.cmd.load()
// Experimental
```
+ Can load a whole directory tree. You can freely categorize the commands by many folders as you want.
+ Prefix option can be a function so you can implement custom prefixes or you say, "Guild specific prefix or User specific prefix"
+ Supports command aliases
+ Supports command disabling
+ Supports guilded bot statuses (new)
+ And more...

---

## What's new
+ Fixed Commands Map
+ Added Bot Status Config

---

## What's being made
+ Event commands handling
+ Command specific cooldown (user/guild specific)
+ GuildedJS 's command class support

---
[Guilded.js docs](https://guilded.js.org)<br>
[Guilded API](https://www.guilded.gg/docs/api)<br>
[Support](https://guilded.gg/powerguilds)