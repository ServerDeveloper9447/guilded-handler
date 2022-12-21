# Guilded Command Handler

This package is inspired by discord command handlers.<br>
Supports: `Guilded.js`

![Installed](https://img.shields.io/npm/dw/guilded-handler?label=Installs&style=for-the-badge)

---

## index.js
```js
const { Client } = require("guilded.js");
const client = new Client({ token: process.env.token });

client.on("ready", () => console.log(`${client.user.raw.name} is Online`));

require('guilded-handler')(client,{path_to_dir:"./commands",prefix:"A!"}) //don't do './commands/'

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
[Guilded.js docs](https://guilded.js.org)<br>
[Guilded API](https://www.guilded.gg/docs/api)

